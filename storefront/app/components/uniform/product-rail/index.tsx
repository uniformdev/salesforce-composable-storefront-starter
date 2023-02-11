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
}

type ProductRailProps = ComponentProps<{
    title: string
    text?: string
    content: Array<Product>
}>

const ProductRail = ({title, text, content}: ProductRailProps) => {
    if (!content || !Array.isArray(content)) {
        return <h1>No products</h1>
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
                    products={content?.map((p) => ({
                        currency: p.currency,
                        image: {
                            alt: p?.image?.alt,
                            disBaseLink: p?.image?.disBaseLink,
                            link: p?.image?.disBaseLink
                        },
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
