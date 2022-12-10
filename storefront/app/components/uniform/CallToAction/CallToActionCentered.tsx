import React from 'react'
import {Button, Link} from '@chakra-ui/react'
import Section from '../../section'
import {CallToActionProps} from './CallToActionProps'

const CallToActionCentered: React.FC<CallToActionProps> = ({
    title,
    subtitle,
    linkUrl,
    linkText,
    content
}) => (
    <Section
        padding={4}
        paddingTop={32}
        title={title || content.title}
        subtitle={<span dangerouslySetInnerHTML={{__html: subtitle || content.subtitle}}></span>}
        actions={
            <Button
                as={Link}
                href={linkUrl || content.linkUrl}
                target="_blank"
                width={'auto'}
                paddingX={7}
                _hover={{textDecoration: 'none'}}
            >
                {linkText || content.linkText}
            </Button>
        }
        maxWidth={'xl'}
    />
)

export default CallToActionCentered
