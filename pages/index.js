import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { baseurl, Fetchapi } from '../utils/Fetchapi'
import Property from '../components/Property'

const Banner = ({ prop, title1, title2, desc1, desc2, image, linkname, buttontext }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10" >
    <Image src={image} width={500} height={300} alt="bannerimg" />
    <Box>
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{prop}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkname}>{buttontext}</Link>

      </Button>

    </Box>
  </Flex>
)


export default function Home({ propertyForRent, propertyForSale }) {
  // console.log(propertyForRent, propertyForSale)
  return (
    <Box>

      <Banner
        prop="Rent Home"
        title1="Rental homes for"
        title2="Everyone"
        desc1="Explore Apartments,Villas,Homes"
        desc2="and more"
        buttontext="Explore Renting"
        linkname="/search?purpose=for-rent"
        image="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"

      />
      <Flex flexWrap="wrap">
        {propertyForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
        prop="Buy Home"
        title1="Find ,Buy &own your"
        title2="Dream home"
        desc1="Explore Apartments,Villas,Homes"
        desc2="and more"
        buttontext="Explore Buying"
        linkname="/search?purpose=for-sale"
        image="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"

      />
      <Flex flexWrap="wrap">
        {propertyForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}


export async function getStaticProps() {
  const propertyForSale = await Fetchapi(`${baseurl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await Fetchapi(`${baseurl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    }
  }


}
