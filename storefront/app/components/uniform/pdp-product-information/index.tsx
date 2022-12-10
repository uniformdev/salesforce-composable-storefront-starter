import * as React from 'react'
import {PDPContext} from '../pdp-context'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Stack
} from '@chakra-ui/react'
import {useIntl} from 'react-intl'

const PdpProductInformation = () => {
    const {product} = React.useContext(PDPContext)
    const {formatMessage} = useIntl()

    return (
        <Stack direction="row" spacing={[0, 0, 0, 16]}>
            <Accordion allowMultiple allowToggle maxWidth={'896px'} flex={[1, 1, 1, 5]}>
                {/* Details */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Product Detail',
                                    id: 'product_detail.accordion.button.product_detail'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product?.longDescription
                            }}
                        />
                    </AccordionPanel>
                </AccordionItem>

                {/* Size & Fit */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Size & Fit',
                                    id: 'product_detail.accordion.button.size_fit'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        {formatMessage({
                            defaultMessage: 'Coming Soon',
                            id: 'product_detail.accordion.message.coming_soon'
                        })}
                    </AccordionPanel>
                </AccordionItem>

                {/* Reviews */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Reviews',
                                    id: 'product_detail.accordion.button.reviews'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        {formatMessage({
                            defaultMessage: 'Coming Soon',
                            id: 'product_detail.accordion.message.coming_soon'
                        })}
                    </AccordionPanel>
                </AccordionItem>

                {/* Questions */}
                <AccordionItem>
                    <h2>
                        <AccordionButton height="64px">
                            <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                {formatMessage({
                                    defaultMessage: 'Questions',
                                    id: 'product_detail.accordion.button.questions'
                                })}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mb={6} mt={4}>
                        {formatMessage({
                            defaultMessage: 'Coming Soon',
                            id: 'product_detail.accordion.message.coming_soon'
                        })}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Box display={['none', 'none', 'none', 'block']} flex={4}></Box>
        </Stack>
    )
}

export default PdpProductInformation
