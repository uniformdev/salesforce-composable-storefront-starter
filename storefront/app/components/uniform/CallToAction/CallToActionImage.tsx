import React from 'react'
import {Stack, Button, Link} from '@chakra-ui/react'
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
    const imageUrl = image?.src ? image.src : image?.startsWith('http') ? image : getAssetUrl(image)
    return (
        <Hero
            img={{
                src: imageUrl,
                alt: title
            }}
            title={title || content?.title}
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
                        {linkText || content?.linkText}
                    </Button>
                </Stack>
            }
        />
    )
}

export default CallToActionImage
