import React from 'react'
import {Stack} from '@chakra-ui/react'
import {ComponentProps} from '@uniformdev/canvas-react'

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
    if (!products || !Array.isArray(products)) {
        return <h1>No products</h1>
    }
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
            const image = product?.imageGroups?.filter((g) => g.viewType === 'large')[0].images[0]
            console.log({image})
            return image
        }
    }

    return (
        <Section
            padding={4}
            paddingTop={16}
            title={title}
            subtitle={<span dangerouslySetInnerHTML={{__html: text}} />}
        >
            <Stack pt={8} spacing={16}>
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
            </Stack>
        </Section>
    )
}

export default ProductRail
