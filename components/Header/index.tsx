import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box bg="gray.700" w="100%" p={4} d="flex" justifyContent="space-between" alignItems="center">
      <Heading color="#fff" size="lg">Crypto Tracker</Heading>
      <Text color="gray.500">&copy; jvcdomingues 2021</Text>
    </Box>
  )
}