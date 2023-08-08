/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {useIntl} from 'react-intl'

// Components
import {Box, Button, Stack} from '@chakra-ui/react'

// Hooks
import useBasket from '../../commerce-api/hooks/useBasket'
import {useVariant} from '../../hooks'
import useWishlist from '../../hooks/use-wishlist'
import useNavigation from '../../hooks/use-navigation'
import useEinstein from '../../commerce-api/hooks/useEinstein'

// Project Components
import composableComponents from '../../components/uniform/uniform-composable-components'

// Others/Utils
import {HTTPNotFound} from 'pwa-kit-react-sdk/ssr/universal/errors'

// constant
import {
    API_ERROR_MESSAGE,
    MAX_CACHE_AGE,
    TOAST_ACTION_VIEW_WISHLIST,
    TOAST_MESSAGE_ADDED_TO_WISHLIST
} from '../../constants'
import {rebuildPathWithParams} from '../../utils/url'
import {useHistory} from 'react-router-dom'
import {useToast} from '../../hooks/use-toast'
import {getCompositionBySlug} from '../../utils/uniform/canvasClient'
import {UniformComposition, UniformSlot, createUniformApiEnhancer} from '@uniformdev/canvas-react'
import {PDPContext} from '../../components/uniform/pdp-context'
import {useAutoCategoryEnrichment} from '../../hooks/use-auto-category-enrichment'

const UniformProductDetailWithComposition = ({category, product, isLoading, composition}) => {
    const enhance = createUniformApiEnhancer({
        apiUrl: `/mobify/proxy/uniform/api/enhance`
    })

    const {formatMessage} = useIntl()
    const basket = useBasket()
    const history = useHistory()
    const einstein = useEinstein()
    const variant = useVariant(product)
    const toast = useToast()
    const navigate = useNavigation()
    const [primaryCategory, setPrimaryCategory] = useState(category)

    // This page uses the `primaryCategoryId` to retrieve the category data. This attribute
    // is only available on `master` products. Since a variation will be loaded once all the
    // attributes are selected (to get the correct inventory values), the category information
    // is overridden. This will allow us to keep the initial category around until a different
    // master product is loaded.
    useEffect(() => {
        if (category) {
            setPrimaryCategory(category)
        }
    }, [category])

    /**************** Wishlist ****************/
    const wishlist = useWishlist()
    // TODO: DRY this handler when intl provider is available globally
    const handleAddToWishlist = async (quantity) => {
        try {
            await wishlist.createListItem({
                id: product.id,
                quantity
            })
            toast({
                title: formatMessage(TOAST_MESSAGE_ADDED_TO_WISHLIST, {quantity: 1}),
                status: 'success',
                action: (
                    // it would be better if we could use <Button as={Link}>
                    // but unfortunately the Link component is not compatible
                    // with Chakra Toast, since the ToastManager is rendered via portal
                    // and the toast doesn't have access to intl provider, which is a
                    // requirement of the Link component.
                    <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                        {formatMessage(TOAST_ACTION_VIEW_WISHLIST)}
                    </Button>
                )
            })
        } catch {
            toast({
                title: formatMessage(API_ERROR_MESSAGE),
                status: 'error'
            })
        }
    }

    /**************** Add To Cart ****************/
    const showToast = useToast()
    const showError = () => {
        showToast({
            title: formatMessage(API_ERROR_MESSAGE),
            status: 'error'
        })
    }
    const handleAddToCart = async (variant, quantity) => {
        try {
            if (!variant?.orderable || !quantity) return
            // The basket accepts an array of `ProductItems`, so lets create a single
            // item array to add to the basket.
            const productItems = [
                {
                    productId: variant.productId,
                    quantity,
                    price: variant.price
                }
            ]

            await basket.addItemToBasket(productItems)
        } catch (error) {
            showError(error)
        }
    }

    /**************** Einstein ****************/
    useEffect(() => {
        if (product) {
            einstein.sendViewProduct(product)
        }
    }, [product])

    useAutoCategoryEnrichment(primaryCategory?.id)

    return (
        <PDPContext.Provider
            value={{
                product,
                category: primaryCategory?.parentCategoryTree || [],
                addToCart: (variant, quantity) => handleAddToCart(variant, quantity),
                addToWishlist: (_, quantity) => handleAddToWishlist(quantity),
                isLoading
            }}
        >
            <UniformComposition
                data={composition}
                enhance={enhance}
                resolveRenderer={composableComponents}
            >
                <Box
                    className="sf-product-detail-page"
                    layerStyle="page"
                    data-testid="product-details-page"
                >
                    <Helmet>
                        <title>{product?.pageTitle}</title>
                        <meta name="description" content={product?.pageDescription} />
                    </Helmet>

                    <Stack spacing={16}>
                        <UniformSlot name="main" />

                        <Stack spacing={16}>
                            <UniformSlot name="editorial" />
                        </Stack>
                    </Stack>
                </Box>
            </UniformComposition>
        </PDPContext.Provider>
    )
}

const UniformProductDetail = (props) => {
    const [cachedComposition, setCachedComposition] = useState(null)

    useEffect(() => {
        getCompositionBySlug('/pdp', false).then((templateComposition) => {
            setCachedComposition(templateComposition)
        })
    }, [props.isLoading])

    if (!props.composition && !cachedComposition) {
        return null
    }

    const componentProps = {...props, composition: props.composition ?? cachedComposition}

    return <UniformProductDetailWithComposition {...componentProps} />
}

UniformProductDetail.getTemplateName = () => 'product-detail'

UniformProductDetail.shouldGetProps = ({previousLocation, location}) => {
    const previousParams = new URLSearchParams(previousLocation?.search || '')
    const params = new URLSearchParams(location.search)

    // If the product changed via the pathname or `pid` param, allow updated
    // data to be retrieved.
    return (
        previousLocation?.pathname !== location.pathname ||
        previousParams.get('pid') !== params.get('pid')
    )
}

UniformProductDetail.getProps = async ({req, res, params, location, api}) => {
    const preview =
        req?.query.preview === 'true' ||
        (typeof window !== 'undefined' && window.location.search.includes('preview=true'))
    const urlParams = new URLSearchParams(location.search)
    const {productId: paramProductId} = params
    const productId = urlParams.get('pid') || paramProductId

    let category

    const [product, compositionOverride, compositionTemplate] = await Promise.all([
        api.shopperProducts.getProduct({
            parameters: {
                id: productId,
                allImages: true
            }
        }),
        getCompositionBySlug(`/product/${productId}`, preview).catch(() => null),
        getCompositionBySlug('/pdp', preview)
    ])

    const composition = compositionOverride ?? compositionTemplate

    if (product?.primaryCategoryId) {
        category = await api.shopperProducts.getCategory({
            parameters: {id: product?.primaryCategoryId, levels: 1}
        })
    }

    // Set the `cache-control` header values similar to those on the product-list.
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    // The `commerce-isomorphic-sdk` package does not throw errors, so
    // we have to check the returned object type to inconsistencies.
    if (typeof product?.type === 'string') {
        throw new HTTPNotFound(product.detail)
    }
    if (typeof category?.type === 'string') {
        throw new HTTPNotFound(category.detail)
    }

    return {category, product, composition}
}

UniformProductDetail.propTypes = UniformProductDetailWithComposition.propTypes = {
    /**
     * The category object used for breadcrumb construction.
     */
    category: PropTypes.object,
    /**
     * The product object to be shown on the page..
     */
    product: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    /**
     * The current react router match object. (Provided internally)
     */
    match: PropTypes.object,
    composition: PropTypes.object
}

export default UniformProductDetail
