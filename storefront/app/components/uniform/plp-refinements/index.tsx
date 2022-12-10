import * as React from 'react'
import Refinements from '../../../pages/product-list/partials/refinements'
import {PLPContext} from '../plp-context'

const PlpRefinements = () => {
    const {
        refinementFilters,
        refinementFiltersLoading,
        selectedRefinementFilters,
        toggleRefinementFilter
    } = React.useContext(PLPContext)

    return (
        <Refinements
            isLoading={refinementFiltersLoading}
            toggleFilter={toggleRefinementFilter}
            filters={refinementFilters}
            selectedFilters={selectedRefinementFilters}
        />
    )
}

export default PlpRefinements
