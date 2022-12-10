import React from 'react'
import {Stack, Button, Link} from '@chakra-ui/react'
import {ComponentProps} from '@uniformdev/canvas-react'
import {getAssetUrl} from 'pwa-kit-react-sdk/ssr/universal/utils'
import Hero from '../../hero'

type CallToActionProps = ComponentProps<{
    title: string
    image?: string
    linkUrl?: string
    linkText?: string
}>

const CallToActionImage = ({title, image, linkUrl, linkText}: CallToActionProps) => {
    const imageUrl = !image ? '' : image.startsWith('http') ? image : getAssetUrl(image)
    return (
        <Hero
            img={{
                src: imageUrl,
                alt: title
            }}
            title={title}
            actions={
                <Stack spacing={{base: 4, sm: 6}} direction={{base: 'column', sm: 'row'}}>
                    <Button
                        as={Link}
                        href={linkUrl}
                        target="_blank"
                        width={{base: 'full', md: 'inherit'}}
                        paddingX={7}
                        _hover={{textDecoration: 'none'}}
                    >
                        {linkText}
                    </Button>
                </Stack>
            }
        />
    )
}

export default CallToActionImage
