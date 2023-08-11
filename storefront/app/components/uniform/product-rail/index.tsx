import React from 'react'
import {Stack} from '@chakra-ui/react'
import {ComponentProps, UniformText} from '@uniformdev/canvas-react'

import Section from '../../section'
import ProductScroller from '../../product-scroller'

type Image = {
    src: string
    alt: string
}

// TODO: SFCC product type
type Product = {
    id: string
    name: string
    price: string
    currency: string
    images: Array<Image>
    imageGroups: Array<any>
}

type ProductRailProps = ComponentProps<{
    title: string
    text?: string
    products: Array<Product>
}>

const ProductRail = ({title, text, products}: ProductRailProps) => {
    const getProductImage = (product: Product) => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return {
                alt: product.images[0].alt,
                disBaseLink: '',
                link: product.images[0].src
            }
        } else if (
            product.imageGroups &&
            Array.isArray(product.imageGroups) &&
            product.imageGroups.length > 0
        ) {
            return product?.imageGroups?.filter((g) => g.viewType === 'large')[0].images[0]
        }
    }

    return (
        <Section
            padding={4}
            paddingTop={16}
            title={<UniformText parameterId="title" />}
            subtitle={<UniformText parameterId="text" />}
        >
            <Stack pt={8} spacing={16}>
                {products && Array.isArray(products) ? (
                    <ProductScroller
                        products={products?.map((p) => ({
                            currency: p.currency,
                            image: getProductImage(p),
                            price: p.price,
                            name: p.name,
                            productName: p.name,
                            productId: p.id
                        }))}
                        isLoading={false}
                    />
                ) : null}
            </Stack>
        </Section>
    )
}

export default ProductRail
