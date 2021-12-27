import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import SearchFilter from '../components/SearchFilter'
import Property from '../components/Property'
import noresult from '../assets/noimg.png'
import { baseurl, Fetchapi } from '../utils/Fetchapi'
const search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter();
    console.log("properies are", properties)
    return (
        <Box>
            <Flex
                cursor='pointer'
                bg='gray.100'
                borderBottom='1px'
                borderColor='gray.200'
                p='2'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>search property</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilter />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties{router.query.purpose}
            </Text>
            <Flex wrap='wrap'>
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image src={noresult} alt='no reuslt' />
                    <Text fontSize='2xl'>No Result Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export default search;


export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await Fetchapi(`${baseurl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties: data?.hits,
        },
    };


}