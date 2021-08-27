import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

import { SiBitcoin } from 'react-icons/si';

export default function Header() {
  return (
    <Box bg="gray.700" w="100%" p={4} d="flex" justifyContent="space-between" alignItems="center">
      <Box d="flex" alignItems="center">
        <SiBitcoin color="white" size="2em" />
        <Heading color="#fff" size="md" ml="4">Crypto Tracker</Heading>
      </Box>
      <Text color="gray.500">&copy; jvcdomingues 2021</Text>
    </Box>
  )
}