import * as React from 'react'
import {
    Box,
    Container,
    Popover,
    PopoverBody,
    PopoverContent,
    SimpleGrid,
    Stack,
    useDisclosure,
    useTheme
} from '@chakra-ui/react'
import {ComponentProps, Slot} from '@uniformdev/canvas-react'
import ListMenuTrigger from './list-menu-trigger'
import {NavItemProps} from './index'

type NavGroupSimpleProps = ComponentProps<{
    title: string
    slug: string
    maxColumns: number
}>

const NavGroupSimple = ({title, slug, component, maxColumns}: NavGroupSimpleProps) => {
    const initialFocusRef = React.useRef()
    const {isOpen, onClose, onOpen} = useDisclosure()
    const sections = component?.slots?.sections

    const theme = useTheme()
    const {baseStyle} = theme.components.ListMenu
    const navItem: NavItemProps = {
        title,
        slug
    }

    return (
        <Box onMouseLeave={onClose}>
            <Popover
                isLazy
                placement={'bottom-start'}
                initialFocusRef={initialFocusRef}
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
                variant="fullWidth"
            >
                <ListMenuTrigger
                    item={navItem}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    hasItems={!!sections}
                />

                {sections && (
                    <PopoverContent data-testid="popover-menu" {...baseStyle.popoverContent}>
                        <PopoverBody>
                            <Container as={Stack} {...baseStyle.popoverContainer}>
                                <SimpleGrid
                                    spacing={8}
                                    justifyContent={'left'}
                                    gridTemplateColumns={`repeat(${
                                        sections.length > maxColumns ? maxColumns : sections.length
                                    }, minmax(0, 21%))`}
                                    marginInlineStart={{lg: '68px', xl: '96px'}}
                                >
                                    <Slot name="sections" />
                                </SimpleGrid>
                            </Container>
                        </PopoverBody>
                    </PopoverContent>
                )}
            </Popover>
        </Box>
    )
}

export default NavGroupSimple
