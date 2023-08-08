import {ComponentProps, UniformSlot} from '@uniformdev/canvas-react'
import {SimpleGrid, HStack, VStack, Text, Flex, Container} from '@chakra-ui/react'
import Section from '../../../components/section'
import * as React from 'react'
import {BasketIcon, LikeIcon, AccountIcon, PlugIcon, DashboardIcon, HeartIcon} from '../../icons'

type FeaturesProps = ComponentProps<{
    title: string
    description: string
}>

type FeatureProps = ComponentProps<{
    title: string
    description: string
    icon: string
}>

const iconsMap = {
    Basket: <BasketIcon />,
    Like: <LikeIcon />,
    Account: <AccountIcon />,
    Plug: <PlugIcon />,
    Dashboard: <DashboardIcon />,
    Heart: <HeartIcon />
}

const Features = ({title, description}: FeaturesProps) => (
    <Section padding={4} paddingTop={32} title={title} subtitle={description}>
        <Container maxW={'6xl'} marginTop={10}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10}>
                <UniformSlot name="features" />
            </SimpleGrid>
        </Container>
    </Section>
)

export const Feature = ({title, description, icon}: FeatureProps) => (
    <HStack key={title} align={'top'}>
        <VStack align={'start'}>
            <Flex
                width={16}
                height={16}
                align={'center'}
                justify={'left'}
                color={'gray.900'}
                paddingX={2}
            >
                {iconsMap[icon]}
            </Flex>
            <Text color={'black'} fontWeight={700} fontSize={20}>
                {title}
            </Text>
            <Text color={'black'}>{description}</Text>
        </VStack>
    </HStack>
)

export default Features
