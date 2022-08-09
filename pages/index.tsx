import { Grid, Box, Heading, Image, Text, Button, Input, FormControl } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

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
  const [coinInput, setCoinInput] = useState('');
  const router = useRouter();

  const handleNavigation = (uuid: string) => {
    router.push(`/coin/${uuid}`);
  }

  const filteredCoins = coinInput.length > 0 ? coins.filter(coin => coin.name.toLowerCase().includes(coinInput)) : coins;

  console.log(coinInput)

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
      </Head>
      <Box d="flex" alignItems="center">
        <FormControl id="coin">
          <Input 
            placeholder="Pesquise uma moeda"
            w="250px"
            color="white"
            mr="5"
            onChange={event => setCoinInput(event.target.value)}
          />
        </FormControl>
      </Box>
      {coinInput ? (
        <Grid templateColumns="repeat(3, 1fr)" gap="10" w="100%" mt="5">
        {filteredCoins.map(coin => (
            <Box 
              bg="gray.700"
              borderRadius="md" 
              p="4" 
              w="100%"
              boxShadow="0px 0px 2px 2px rgba(0,0,0,0.1)"
              mt="5"
              key={coin.uuid}
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
      ) : (
      <Grid templateColumns="repeat(3, 1fr)" gap="10" w="100%" mt="5">
        {coins.map(coin => (
          <Box 
            bg="gray.700"
            key={coin.uuid} 
            borderRadius="md" 
            p="4" 
            w="100%" 
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
      )}
    </>
  )
}

export async function getStaticProps() {
  const response = await api.get('coins');
  const { data: responseData } = response;

  const { data } = responseData;
  const { coins } = data;

  const filteredData = coins.map((coin: Coins) => ({
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