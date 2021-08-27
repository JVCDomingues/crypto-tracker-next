import { Grid, Box, Heading, Image, Text, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const handleNavigation = (uuid: string) => {
    router.push(`/coin/${uuid}`);
  }

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
      </Head>
      <Grid p="4" templateColumns="repeat(3, 1fr)" gap="10" w="100%">
        {coins.map(coin => (
          <Box 
            borderWidth="2px" 
            key={coin.uuid} 
            borderRadius="md" 
            p="4" 
            w="100%" 
            borderColor={coin.color}
            boxShadow="0px 0px 2px 2px rgba(0,0,0,0.1)"
          >
            <Box d="flex" alignItems="center">
              <Image src={coin.iconUrl} size="sm" alt={coin.name} boxSize="40px" />
              <Heading size="md" color="#fff" ml="5">{coin.name}</Heading>
            </Box>

            <Text mt="5" color="white" fontWeight="bold">$ {coin.price}</Text>

            <Button w="100%" mt="5" colorScheme="telegram" onClick={() => handleNavigation(coin.uuid)}>Ver Detalhes</Button>
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

  const filteredData = coins.map((coin: { uuid: string; name: string; symbol: string; color: string; iconUrl: string; change: string; price: string; }) => ({
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