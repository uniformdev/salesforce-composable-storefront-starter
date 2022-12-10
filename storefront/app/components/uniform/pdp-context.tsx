import {createContext} from 'react'

interface PDPContextTypeProps {
    product: any
    category: any
    addToCart?: ((...args: any[]) => any) | null | undefined
    addToWishlist?: ((...args: any[]) => any) | null | undefined
    isLoading: boolean
}

export const PDPContext = createContext<PDPContextTypeProps>({
    product: undefined,
    category: undefined,
    addToCart: undefined,
    addToWishlist: undefined,
    isLoading: true
})
