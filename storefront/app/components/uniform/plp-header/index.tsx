import {Flex, Stack, Box} from '@chakra-ui/react'
import * as React from 'react'
import SelectedRefinements from '../../../pages/product-list/partials/selected-refinements'
import PageHeader from '../../../pages/product-list/partials/page-header'
import {Sort} from '../../../pages/product-list/uniform'
import {PLPContext} from '../plp-context'

const PlpHeader = () => {
    const {
        searchQuery,
        category,
        productSearchResult,
        isLoading,
        toggleRefinementFilter,
        sortUrls,
        basePath
    } = React.useContext(PLPContext)

    // return 'plp header'

    return (
        <Stack
            display={{base: 'none', lg: 'flex'}}
            direction="row"
            justify="flex-start"
            align="flex-start"
            spacing={4}
            marginBottom={6}
        >
            <Flex align="left" width="287px">
                <PageHeader
                    searchQuery={searchQuery}
                    category={category}
                    productSearchResult={productSearchResult}
                    isLoading={isLoading}
                />
            </Flex>

            <Box flex={1} paddingTop={'45px'}>
                <SelectedRefinements
                    filters={productSearchResult?.refinements}
                    toggleFilter={toggleRefinementFilter}
                    selectedFilterValues={productSearchResult?.selectedRefinements}
                />
            </Box>
            <Box paddingTop={'45px'}>
                <Sort
                    sortUrls={sortUrls}
                    productSearchResult={productSearchResult}
                    basePath={basePath}
                />
            </Box>
        </Stack>
    )
}

export default PlpHeader
