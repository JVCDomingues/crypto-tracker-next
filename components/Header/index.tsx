import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box bg="gray.700" w="100%" p={4}>
      <Heading color="#fff" size="lg">Crypto Tracker</Heading>
    </Box>
  )
}