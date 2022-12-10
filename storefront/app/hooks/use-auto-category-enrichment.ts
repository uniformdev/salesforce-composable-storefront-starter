import {useUniformContext} from '@uniformdev/context-react'
import {useEffect, useMemo} from 'react'

export const useAutoCategoryEnrichment = (categoryId?: string): void => {
    const enrichments = useMemo(() => {
        if (!categoryId) {
            return []
        }

        return categoryId.split('-').map((e) => {
            return {
                cat: 'cat',
                key: e,
                str: 5
            }
        })
    }, [categoryId])

    const {context} = useUniformContext()

    useEffect(() => {
        if (enrichments.length === 0) {
            return
        }

        context.update({enrichments})
    }, [enrichments.length])
}
