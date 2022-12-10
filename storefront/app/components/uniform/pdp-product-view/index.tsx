import * as React from 'react'
import {PDPContext} from '../pdp-context'
import ProductView from '../../../partials/product-view'

const PdpProductView = () => {
    const {isLoading, category, product, addToCart, addToWishlist} = React.useContext(PDPContext)

    return (
        <ProductView
            product={product}
            category={category}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            isProductLoading={isLoading}
        />
    )
}

export default PdpProductView
