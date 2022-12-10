import * as React from 'react'
import {PLPContext} from '../plp-context'
import EmptySearchResults from '../../../pages/product-list/partials/empty-results'

const PlpNoResults = () => {
    const {searchQuery, category} = React.useContext(PLPContext)

    return <EmptySearchResults searchQuery={searchQuery} category={category} />
}

export default PlpNoResults
