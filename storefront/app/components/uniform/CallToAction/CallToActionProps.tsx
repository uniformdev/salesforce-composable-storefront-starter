import {ComponentProps} from '@uniformdev/canvas-react'

export type CallToActionProps = ComponentProps<{
    content: {
        title: string
        subtitle: string
        linkUrl?: string
        linkText?: string
    }
    title: string
    subtitle: string
    linkUrl?: string
    linkText?: string
    image?: any
}>
