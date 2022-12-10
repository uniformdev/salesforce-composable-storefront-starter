import {Flex, Stack, Box, Button} from '@chakra-ui/react'
import * as React from 'react'
import SelectedRefinements from '../../../pages/product-list/partials/selected-refinements'
import PageHeader from '../../../pages/product-list/partials/page-header'
import {FormattedMessage, useIntl} from 'react-intl'
import {FilterIcon, ChevronDownIcon} from '../../../components/icons'

import {HideOnDesktop} from '../../../components/responsive'
import {PLPContext} from '../plp-context'

const PlpHeaderMobile = () => {
    const {formatMessage} = useIntl()

    const {
        searchQuery,
        category,
        productSearchResult,
        isLoading,
        toggleRefinementFilter,
        onOpen,
        setSortOpen,
        selectedSortingOptionLabel
    } = React.useContext(PLPContext)

    // return 'plp header'

    return (
        <HideOnDesktop>
            <Stack spacing={6}>
                <PageHeader
                    searchQuery={searchQuery}
                    category={category}
                    productSearchResult={productSearchResult}
                    isLoading={isLoading}
                />
                <Stack
                    display={{base: 'flex', md: 'none'}}
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing={1}
                    height={12}
                    borderColor="gray.100"
                >
                    <Flex align="center">
                        <Button
                            fontSize="sm"
                            colorScheme="black"
                            variant="outline"
                            marginRight={2}
                            display="inline-flex"
                            leftIcon={<FilterIcon boxSize={5} />}
                            onClick={onOpen}
                        >
                            <FormattedMessage
                                defaultMessage="Filter"
                                id="product_list.button.filter"
                            />
                        </Button>
                    </Flex>
                    <Flex align="center">
                        <Button
                            maxWidth="245px"
                            fontSize="sm"
                            marginRight={2}
                            colorScheme="black"
                            variant="outline"
                            display="inline-flex"
                            rightIcon={<ChevronDownIcon boxSize={5} />}
                            onClick={() => setSortOpen(true)}
                        >
                            {formatMessage(
                                {
                                    id: 'product_list.button.sort_by',
                                    defaultMessage: 'Sort By: {sortOption}'
                                },
                                {
                                    sortOption: selectedSortingOptionLabel?.label
                                }
                            )}
                        </Button>
                    </Flex>
                </Stack>
            </Stack>
            <Box marginBottom={4}>
                <SelectedRefinements
                    filters={productSearchResult?.refinements}
                    toggleFilter={toggleRefinementFilter}
                    selectedFilterValues={productSearchResult?.selectedRefinements}
                />
            </Box>
        </HideOnDesktop>
    )
}

export default PlpHeaderMobile
