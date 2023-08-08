import * as React from 'react'
import {ComponentProps, UniformSlot} from '@uniformdev/canvas-react'
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Text,
    useStyleConfig
} from '@chakra-ui/react'
import Link from '../../link'
import {ChevronDownIcon, ChevronRightIcon} from '../../icons'
import {categoryUrlBuilder} from '../../../utils/url'

type NavGroupSimpleProps = ComponentProps<{
    title: string
    slug: string
}>
const NavGroupSimple = ({title, slug, component}: NavGroupSimpleProps) => {
    const styles = useStyleConfig('NestedAccordion')
    const items = component?.slots?.sections

    return (
        <AccordionItem border="none">
            {({isExpanded}) => (
                <>
                    <h2>
                        {items && items.length > 0 ? (
                            <AccordionButton {...styles.internalButton}>
                                {isExpanded ? (
                                    <ChevronDownIcon {...styles.internalButtonIcon} />
                                ) : (
                                    <ChevronRightIcon {...styles.internalButtonIcon} />
                                )}
                                <Text fontSize={'lg'} fontWeight={'semibold'}>
                                    {title}
                                </Text>
                            </AccordionButton>
                        ) : (
                            <AccordionButton
                                {...styles.leafButton}
                                as={Link}
                                to={categoryUrlBuilder({id: slug})}
                            >
                                <Text fontSize={'lg'} fontWeight={'semibold'}>
                                    {title}
                                </Text>
                            </AccordionButton>
                        )}
                    </h2>

                    {items && (
                        <AccordionPanel {...styles.panel}>
                            <Accordion
                                className="sf-nested-accordion"
                                allowToggle={true}
                                {...styles.nestedAccordion}
                            >
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            {...styles.leafButton}
                                            as={Link}
                                            to={categoryUrlBuilder({id: slug})}
                                        >
                                            <Text fontSize={'md'} fontWeight={'semibold'}>
                                                Show all
                                            </Text>
                                        </AccordionButton>
                                    </h2>
                                </AccordionItem>
                                <UniformSlot name="sections" />
                            </Accordion>
                        </AccordionPanel>
                    )}
                </>
            )}
        </AccordionItem>
    )
}

export default NavGroupSimple
