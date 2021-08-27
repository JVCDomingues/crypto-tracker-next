import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { IParams, CoinProps } from '../../types/Coin';

import { Heading, Box, Image, Text, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import api from '../../services/api';

export default function CoinPage({ data }: CoinProps) {
  const router = useRouter();

  if(router.isFallback) {
    return <Heading>Loading...</Heading>
  }

  return (
    <>
      <Button 
        colorScheme="teal" 
        onClick={() => router.push('/')} 
        variant="ghost"
        leftIcon={<ArrowBackIcon />}
        mb="5"
      >
        Voltar
      </Button>
      <Box d="flex" justifyContent="center" alignItems="center">
        <Box 
          p="8" 
          borderWidth="2px" 
          borderRadius="md"
          borderColor={data.color}
        >
          <Box d="flex" alignItems="center" mb="5">
            <Image src={data.iconUrl} size="sm" alt={data.name} boxSize="40px" />
            <Heading size="md" color={data.color} ml="5">{data.name}</Heading>
          </Box>
          <Text color="white" dangerouslySetInnerHTML={{ __html: data.description }} fontWeight="bold"/>
        </Box>
      </Box>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { uuid } = context.params as IParams;

  const response = await api.get(`coin/${uuid}`);
  const { data } = response.data;
  const { coin } = data;

  return {
    props: {
      data: coin
    },
  }
}