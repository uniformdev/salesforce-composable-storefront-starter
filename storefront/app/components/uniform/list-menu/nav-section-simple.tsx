import * as React from 'react'
import {ComponentProps, UniformSlot} from '@uniformdev/canvas-react'
import {Box, Heading, List, useMultiStyleConfig} from '@chakra-ui/react'
import {categoryUrlBuilder} from '../../../utils/url'
import Link from '../../link'

type NavSectionSimpleProps = ComponentProps<{
    title: string
    slug: string
}>

const NavSectionSimple = ({title, slug, component}: NavSectionSimpleProps) => {
    const color = 'gray.900'
    const variant = 'horizontal'
    const styles = useMultiStyleConfig('LinksList', {variant})

    const heading = {
        href: categoryUrlBuilder({id: slug}),
        text: title,
        styles: {
            fontSize: 'md',
            marginBottom: 2
        }
    }

    return (
        <Box {...styles.container} {...(color ? {color: color} : {})}>
            {heading &&
                (heading.href ? (
                    <Link
                        to={heading.href}
                        // onClick={onLinkClick}
                        // ref={headingLinkRef}
                        {...styles.headingLink}
                    >
                        <Heading {...styles.heading} {...(heading.styles ? heading.styles : {})}>
                            {heading.text}
                        </Heading>
                    </Link>
                ) : (
                    <Heading {...styles.heading}>{heading}</Heading>
                ))}
            {component?.slots?.items && (
                <List spacing={5}>
                    <UniformSlot name="items" />
                </List>
            )}
        </Box>
    )
}

export default NavSectionSimple
