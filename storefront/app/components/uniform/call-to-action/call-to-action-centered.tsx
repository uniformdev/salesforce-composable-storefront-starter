import React from 'react'
import {ComponentProps} from '@uniformdev/canvas-react'
import {Button, Link} from '@chakra-ui/react'
import Section from '../../section'

type CallToActionCenteredProps = ComponentProps<{
    title: string
    subtitle: string
    linkUrl: string
    linkText: string
}>

const CallToActionCentered = ({title, subtitle, linkUrl, linkText}: CallToActionCenteredProps) => (
    <Section
        padding={4}
        paddingTop={32}
        title={title}
        subtitle={<span dangerouslySetInnerHTML={{__html: subtitle}}></span>}
        actions={
            <Button
                as={Link}
                href={linkUrl}
                target="_blank"
                width={'auto'}
                paddingX={7}
                _hover={{textDecoration: 'none'}}
            >
                {linkText}
            </Button>
        }
        maxWidth={'xl'}
    />
)

export default CallToActionCentered
