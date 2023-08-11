import React from 'react'
import {Stack, Button, Link} from '@chakra-ui/react'
import {UniformText} from '@uniformdev/canvas-react'

import {getAssetUrl} from 'pwa-kit-react-sdk/ssr/universal/utils'
import Hero from '../../hero'
import {CallToActionProps} from './callToActionProps'

const CallToActionImage: React.FC<CallToActionProps> = ({
    content,
    title,
    image,
    linkUrl,
    linkText
}) => {
    return (
        <Hero
            img={{
                src: getImageUrl(image),
                alt: title
            }}
            title={title ? <UniformText parameterId="title" /> : content?.title}
            actions={
                <Stack spacing={{base: 4, sm: 6}} direction={{base: 'column', sm: 'row'}}>
                    <Button
                        as={Link}
                        href={linkUrl || content?.linkUrl}
                        target="_blank"
                        width={{base: 'full', md: 'inherit'}}
                        paddingX={7}
                        _hover={{textDecoration: 'none'}}
                    >
                        {linkText ? <UniformText parameterId="linkText" /> : content?.linkText}
                    </Button>
                </Stack>
            }
        />
    )
}

function getImageUrl(image) {
    if (!image) {
        return ''
    }

    // image string coming from Canvas
    if (typeof image === 'string' || image instanceof String) {
        // if external image, return as is
        // otherwise run it via getAssetUrl helper to get a proper link
        return image?.startsWith('http') ? image : getAssetUrl(image)
    }

    return image?.src
}

export default CallToActionImage
