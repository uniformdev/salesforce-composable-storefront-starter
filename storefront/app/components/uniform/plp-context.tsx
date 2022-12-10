import {createContext} from 'react'

interface PLPContextTypeProps {
    refinementFiltersLoading: boolean
    toggleRefinementFilter: (...args: any[]) => any
    refinementFilters: any[]
    selectedRefinementFilters: object
    searchQuery: string
    category: any
    productSearchResult: any
    isLoading: boolean
    sortUrls: string[]
    basePath: string
    onOpen: () => void
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedSortingOptionLabel: any
    searchParams: {
        limit: number
        offset: number
        sort: string
        refine: never[]
    }

    wishlist: any
    addItemToWishlist: (product: any) => Promise<void>
    removeItemFromWishlist: (product: any) => Promise<void>
    history: any
    pageUrls: string[]
    limitUrls: string[]
    DEFAULT_LIMIT_VALUES: number[]
}

export const PLPContext = createContext<PLPContextTypeProps>({
    refinementFiltersLoading: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleRefinementFilter: () => {},
    refinementFilters: [],
    selectedRefinementFilters: {},
    searchQuery: '',
    category: undefined,
    productSearchResult: null,
    isLoading: true,
    sortUrls: [],
    basePath: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onOpen: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSortOpen: () => {},
    selectedSortingOptionLabel: undefined,
    searchParams: {
        limit: 0,
        offset: 0,
        sort: '',
        refine: []
    },
    wishlist: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addItemToWishlist: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeItemFromWishlist: async () => {},
    history: {},
    pageUrls: [],
    limitUrls: [],
    DEFAULT_LIMIT_VALUES: []
})
