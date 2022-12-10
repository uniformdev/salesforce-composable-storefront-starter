import * as React from 'react'
import {Flex, Select} from '@chakra-ui/react'
import Pagination from '../../pagination'
import {PLPContext} from '../plp-context'
import {useHistory} from 'react-router-dom'

const PlpFooter = () => {
    const history = useHistory()
    const {basePath, pageUrls, limitUrls, DEFAULT_LIMIT_VALUES} = React.useContext(PLPContext)

    return (
        <Flex justifyContent={['center', 'center', 'flex-start']} paddingTop={8}>
            <Pagination currentURL={basePath} urls={pageUrls} />
            <Select
                display="none"
                value={basePath}
                onChange={({target}) => {
                    history.push(target.value)
                }}
            >
                {limitUrls.map((href, index) => (
                    <option key={href} value={href}>
                        {DEFAULT_LIMIT_VALUES[index]}
                    </option>
                ))}
            </Select>
        </Flex>
    )
}

export default PlpFooter
