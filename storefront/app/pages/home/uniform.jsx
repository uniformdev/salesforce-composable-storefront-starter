/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {UniformComposition, createUniformApiEnhancer, UniformSlot} from '@uniformdev/canvas-react'

import {Box} from '@chakra-ui/react'
import {getCompositionBySlug} from '../../utils/uniform/canvasClient'
import composableComponents from '../../components/uniform/uniform-composable-components'
import Seo from '../../components/seo'
// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT
} from '../../constants'

const HomeWithComposition = ({composition}) => {
    const enhance = createUniformApiEnhancer({
        apiUrl: `/mobify/proxy/uniform/api/enhance`
    })

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
            {composition && (
                <UniformComposition
                    contextualEditingEnhancer={enhance}
                    data={composition}
                    resolveRenderer={composableComponents}
                >
                    <UniformSlot name="main" />
                </UniformComposition>
            )}
        </Box>
    )
}

HomeWithComposition.propTypes = {
    composition: PropTypes.object
}

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({composition}) => {
    if (!composition) {
        return null
    }

    return <HomeWithComposition composition={composition} />
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

Home.getProps = async ({req, res, api}) => {
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const preview =
        req?.query.preview === 'true' ||
        (typeof window !== 'undefined' && window.location.search.includes('preview=true'))

    const [productSearchResult, composition] = await Promise.all([
        api.shopperSearch.productSearch({
            parameters: {
                refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
                limit: HOME_SHOP_PRODUCTS_LIMIT
            }
        }),
        getCompositionBySlug('/', preview)
    ])

    return {productSearchResult, composition}
}

Home.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    composition: PropTypes.object
}

export default Home
