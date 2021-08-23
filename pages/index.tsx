import { Grid, Box, Heading, Image, Text } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Header from '../components/Header';

import api from '../services/api';

type HomeProps = {
  coins: Coins[];
}

type Coins = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  change: string;
  price: string;
}

const Home: NextPage<HomeProps> = ({ coins }) => {
  return (
    <>
      <Header />
      <Grid p="4" templateColumns="repeat(3, 1fr)" gap="12" w="100%">
        {coins.map(coin => (
          <Box borderWidth="1px" key={coin.uuid} borderRadius="md" p="8" w="100%" borderColor="gray.600">
            <Box d="flex" alignItems="center">
              <Image src={coin.iconUrl} size="sm" alt={coin.name} boxSize="40px" />
              <Heading size="md" color={coin.color} ml="5">{coin.name}</Heading>
            </Box>

            <Text>Preço: {coin.price}</Text>
          </Box>
        ))}
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const response = await api.get('coins');
  const { data: responseData } = response;

  const { data } = responseData;
  const { coins } = data;

  const filteredData = coins.map((coin: { uuid: any; name: any; symbol: any; color: any; iconUrl: any; change: any; price: any; }) => ({
    uuid: coin.uuid,
    name: coin.name,
    symbol: coin.symbol,
    color: coin.color,
    iconUrl: coin.iconUrl,
    change: coin.change,
    price: Number(coin.price).toLocaleString(),
  }));

  return {
    props: {
      coins: filteredData,
    },
  }
}

export default Home;