import * as React from 'react'
import {SimpleGrid} from '@chakra-ui/react'
import ProductTile, {Skeleton as ProductTileSkeleton} from '../../product-tile'
import {PLPContext} from '../plp-context'

const PlpListing = () => {
    const {
        isLoading,
        productSearchResult,
        searchParams,
        wishlist,
        addItemToWishlist,
        removeItemFromWishlist
    } = React.useContext(PLPContext)

    return (
        <SimpleGrid columns={[2, 2, 3, 3]} spacingX={4} spacingY={{base: 12, lg: 16}}>
            {isLoading || !productSearchResult
                ? new Array(searchParams.limit)
                      .fill(0)
                      .map((value, index) => <ProductTileSkeleton key={index} />)
                : productSearchResult.hits.map((productSearchItem) => {
                      const productId = productSearchItem.productId
                      const isInWishlist = !!wishlist.findItemByProductId(productId)

                      return (
                          <ProductTile
                              data-testid={`sf-product-tile-${productSearchItem.productId}`}
                              key={productSearchItem.productId}
                              product={productSearchItem}
                              enableFavourite={true}
                              isFavourite={isInWishlist}
                              onFavouriteToggle={(isFavourite) => {
                                  const action = isFavourite
                                      ? addItemToWishlist
                                      : removeItemFromWishlist
                                  return action(productSearchItem)
                              }}
                              dynamicImageProps={{
                                  widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
                              }}
                          />
                      )
                  })}
        </SimpleGrid>
    )
}

export default PlpListing
