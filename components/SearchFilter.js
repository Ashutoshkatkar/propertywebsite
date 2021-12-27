import { useEffect, useState } from "react";
import { Flex, Box, Select, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import { useRouter } from "next/dist/client/router";
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import { FilterData, getFilterValues } from "../utils/Filterdata";
// import { useRouter } from 'next/router';
const SearchFilter = () => {
    const [filters, setFilters] = useState(FilterData);
    const router = useRouter();

    const searchProperties = (filtervalues) => {
        const path = router.pathname;
        const { query } = router;
        const values = getFilterValues(filtervalues);
        values.forEach((item) => {
            if (item.value && filtervalues?.[item.name]) {
                query[item.name] = item.value;

            }
        })
        router.push({ pathname: path, query })
    }

    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap="wrap" >
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select placeholder={filter.placeholder} w="fit-content" p='2' onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}>
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>{item.name}</option>
                        ))}
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}

export default SearchFilter