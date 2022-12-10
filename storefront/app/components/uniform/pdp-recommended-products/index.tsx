import * as React from 'react'
import PropTypes from 'prop-types'
import {PDPContext} from '../pdp-context'
import RecommendedProducts from '../../recommended-products'

interface PdpRecommendedProductsProps {
    title: string
    recommender: string
}

const PdpRecommendedProducts: React.FC<PdpRecommendedProductsProps> = ({title, recommender}) => {
    const {product} = React.useContext(PDPContext)

    return (
        <RecommendedProducts
            title={title}
            recommender={recommender}
            products={product && [product.id]}
            mx={{base: -4, md: -8, lg: 0}}
            shouldFetch={() => product?.id}
            zone=""
        />
    )
}

PdpRecommendedProducts.propTypes = {
    title: PropTypes.string.isRequired,
    recommender: PropTypes.string.isRequired
}

export default PdpRecommendedProducts
