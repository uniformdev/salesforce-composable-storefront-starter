/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as React from 'react'

// Components
import {Accordion} from '@chakra-ui/react'
import {RootComponentInstance} from '@uniformdev/canvas'
import {Composition, DefaultNotImplementedComponent, Slot} from '@uniformdev/canvas-react'
import NavGroupSimple from './nav-group-simple'
import NavSectionSimple from './nav-section-simple'
import NavItemSimple from './nav-item-simple'

type UniformNestedAccordionProps = {
    navComposition: RootComponentInstance
}

const components = {
    navGroupSimple: NavGroupSimple,
    navSectionSimple: NavSectionSimple,
    navItemSimple: NavItemSimple
}

const resolveRenderer = (component) => {
    return components[component.type] || DefaultNotImplementedComponent
}

const UniformNestedAccordion = (props: UniformNestedAccordionProps) => {
    const {navComposition, ...rest} = props

    return (
        <Accordion className="sf-nested-accordion" allowToggle={true} {...rest}>
            <Composition
                data={navComposition}
                resolveRenderer={resolveRenderer}
                behaviorTracking={'onLoad'}
            >
                <Slot name="groups" />
            </Composition>
        </Accordion>
    )
}

export default UniformNestedAccordion
