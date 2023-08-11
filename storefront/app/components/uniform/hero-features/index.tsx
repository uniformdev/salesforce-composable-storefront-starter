import React from 'react'
import {Box, SimpleGrid, HStack, Text, Flex, Link} from '@chakra-ui/react'
import {ComponentProps, UniformSlot, UniformText } from '@uniformdev/canvas-react'
import Section from '../../section'
import {BrandLogo, FigmaLogo, GithubLogo, HeartIcon} from '../../icons'

const icons = {
    GithubLogo: <GithubLogo width={12} height={12} />,
    BrandLogo: <BrandLogo width={12} height={8} />,
    FigmaLogo: <FigmaLogo width={12} height={8} />
}

const HeroFeatures = () => {
    return (
        <Section
            background={'gray.50'}
            marginX="auto"
            paddingY={{base: 8, md: 16}}
            paddingX={{base: 4, md: 8}}
            borderRadius="base"
            width={{base: '100vw', md: 'inherit'}}
            position={{base: 'relative', md: 'inherit'}}
            left={{base: '50%', md: 'inherit'}}
            right={{base: '50%', md: 'inherit'}}
            marginLeft={{base: '-50vw', md: 'auto'}}
            marginRight={{base: '-50vw', md: 'auto'}}
        >
            <SimpleGrid
                columns={{base: 1, md: 1, lg: 3}}
                spacingX={{base: 1, md: 4}}
                spacingY={{base: 4, md: 14}}
            >
                <UniformSlot name="features" />
            </SimpleGrid>
        </Section>
    )
}

type HeroFeatureProps = ComponentProps<{
    link: string
    icon: string
    message: string
}>

export const HeroFeature = ({link, icon, message}: HeroFeatureProps) => (
    <Box background={'white'} boxShadow={'0px 2px 2px rgba(0, 0, 0, 0.1)'} borderRadius={'4px'}>
        <Link target="_blank" href={link}>
            <HStack>
                <Flex paddingLeft={6} height={24} align={'center'} justify={'center'}>
                    {Object.keys(icons).includes(icon) ? (
                        icons[icon]
                    ) : (
                        <HeartIcon width={12} height={8} />
                    )}
                </Flex>
                <Text fontWeight="700">
                    <UniformText parameterId="message" />
                </Text>
            </HStack>
        </Link>
    </Box>
)

export default HeroFeatures
