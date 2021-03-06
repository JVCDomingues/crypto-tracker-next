import { Grid, Box, Heading, Image, Text, Button, Input, FormControl, FormHelperText } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const [foundCoin, setFoundCoin] = useState({} as Coins);
  const router = useRouter();

  const handleNavigation = (uuid: string) => {
    router.push(`/coin/${uuid}`);
  }

  const handleSearchButton = () => {
    const coin = coinInput && coins.find(coin => coin.name === coinInput);
    if(coin) {
      setFoundCoin(coin);
      return;
    }
    setHasError(true);
  }

  useEffect(() => {
    if(!coinInput) {
      setFoundCoin({} as Coins);
      setHasError(false);
    }
  }, [coinInput]);

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
      </Head>
      <Box d="flex" alignItems="center">
        <FormControl id="coin">
          <Input 
            isInvalid={hasError}
            placeholder="Pesquise uma moeda"
            w="250px"
            color="white"
            mr="5"
            onChange={event => setCoinInput(event.target.value)}
          />
          {hasError && <FormHelperText>Moeda não encontrada</FormHelperText>}
          <Button colorScheme="teal" onClick={handleSearchButton}>Pesquisar</Button>
        </FormControl>
      </Box>
      {Object.keys(foundCoin).length !== 0 && coinInput ? (
        <Box 
          bg="gray.700"
          key={foundCoin.uuid} 
          borderRadius="md" 
          p="4" 
          w="350px"
          boxShadow="0px 0px 2px 2px rgba(0,0,0,0.1)"
          mt="5"
        >
          <Box d="flex" alignItems="center">
            <Image src={foundCoin.iconUrl} size="sm" alt={foundCoin.name} boxSize="40px" />
            <Heading size="md" color="#fff" ml="5">{foundCoin.name}</Heading>
          </Box>

          <Text mt="5" color="white" fontWeight="bold">$ {foundCoin.price}</Text>

          <Button w="100%" mt="5" colorScheme="telegram" onClick={() => handleNavigation(foundCoin.uuid)}>Ver Detalhes</Button>
        </Box>
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