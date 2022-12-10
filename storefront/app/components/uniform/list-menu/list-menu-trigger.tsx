import {Box, PopoverTrigger, useTheme} from '@chakra-ui/react'
import {Link as RouteLink} from 'react-router-dom'
import * as React from 'react'
import Link from '../../link'
import {categoryUrlBuilder} from '../../../utils/url'
import {ChevronDownIcon} from '../../icons'
import {NavItemProps} from './index'

type ListMenuTriggerProps = {
    item: NavItemProps
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    hasItems: boolean
}

const ListMenuTrigger = ({item, isOpen, onOpen, onClose, hasItems}: ListMenuTriggerProps) => {
    const theme = useTheme()
    const {baseStyle} = theme.components.ListMenu

    const keyMap = {
        Escape: () => onClose(),
        Enter: () => onOpen()
    }

    return (
        <Box {...baseStyle.listMenuTriggerContainer}>
            <Link
                as={RouteLink}
                to={categoryUrlBuilder({
                    id: item.slug
                })}
                onMouseOver={onOpen}
                {...baseStyle.listMenuTriggerLink}
                {...(hasItems ? {name: item.title + ' __'} : {name: item.title})}
                {...(!hasItems ? baseStyle.listMenuTriggerLinkWithIcon : {})}
                {...(isOpen ? baseStyle.listMenuTriggerLinkActive : {})}
            >
                {item.title}
            </Link>

            {hasItems && (
                <Link
                    as={RouteLink}
                    to={'#'}
                    onMouseOver={onOpen}
                    onKeyDown={(e) => {
                        keyMap[e.key]?.(e)
                    }}
                    {...baseStyle.listMenuTriggerLinkIcon}
                >
                    <PopoverTrigger>
                        <ChevronIconTrigger {...baseStyle.selectedButtonIcon} />
                    </PopoverTrigger>
                </Link>
            )}
        </Box>
    )
}

const ChevronIconTrigger = React.forwardRef(function ChevronIconTrigger(props, ref) {
    return (
        <Box {...props} ref={ref}>
            <ChevronDownIcon />
        </Box>
    )
})

export default ListMenuTrigger
