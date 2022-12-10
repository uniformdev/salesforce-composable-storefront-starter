import * as React from 'react'
import {ComponentProps} from '@uniformdev/canvas-react'
import {AccordionButton, AccordionItem, Text, useStyleConfig} from '@chakra-ui/react'
import Link from '../../link'
import {categoryUrlBuilder} from '../../../utils/url'

type NavItemSimpleProps = ComponentProps<{
    title: string
    slug: string
}>
const NavItemSimple = ({title, slug}: NavItemSimpleProps) => {
    const styles = useStyleConfig('NestedAccordion')

    return (
        <AccordionItem border="none">
            <h2>
                <AccordionButton
                    {...styles.leafButton}
                    as={Link}
                    to={categoryUrlBuilder({id: slug})}
                >
                    <Text fontSize={'md'} fontWeight={'regular'}>
                        {title}
                    </Text>
                </AccordionButton>
            </h2>
        </AccordionItem>
    )
}

export default NavItemSimple
