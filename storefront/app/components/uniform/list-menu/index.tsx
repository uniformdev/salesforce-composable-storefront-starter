import * as React from 'react'

import {Flex, Stack, useTheme} from '@chakra-ui/react'
import {ComponentProps, UniformComposition, UniformSlot} from '@uniformdev/canvas-react'
import {RootComponentInstance} from '@uniformdev/canvas'
import composableComponents from '../uniform-composable-components'

const ListMenu = ({navComposition}: ListMenuProps) => {
    const theme = useTheme()
    const {baseStyle} = theme.components.ListMenu

    return (
        <nav aria-label="main">
            <Flex {...baseStyle.container}>
                {navComposition && (
                    <Stack direction={'row'} spacing={0} {...baseStyle.stackContainer}>
                        <UniformComposition
                            data={navComposition}
                            resolveRenderer={composableComponents}
                            behaviorTracking={'onLoad'}
                        >
                            <UniformSlot name="groups" />
                        </UniformComposition>
                    </Stack>
                )}
            </Flex>
        </nav>
    )
}

type ListMenuProps = ComponentProps<{
    navComposition: RootComponentInstance
}>

export type NavItemProps = {
    title: string
    slug: string
}

export default ListMenu
