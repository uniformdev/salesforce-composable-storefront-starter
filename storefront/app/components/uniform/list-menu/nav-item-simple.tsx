import * as React from 'react'
import {ComponentProps} from '@uniformdev/canvas-react'
import {ComponentInstance} from '@uniformdev/canvas'
import {ListItem} from '@chakra-ui/react'
import {categoryUrlBuilder} from '../../../utils/url'
import Link from '../../link'

type NavItemSimpleProps = ComponentProps<{
    title: string
    slug: string
    component: ComponentInstance
}>

const NavItemSimple = ({title, slug}: NavItemSimpleProps) => {
    const onLinkClick = () => {}
    const styles = {
        fontSize: 'md',
        paddingTop: 3,
        paddingBottom: 3
    }

    return (
        <ListItem>
            <Link to={categoryUrlBuilder({id: slug})} onClick={onLinkClick} {...styles}>
                {title}
            </Link>
        </ListItem>
    )
}

export default NavItemSimple
