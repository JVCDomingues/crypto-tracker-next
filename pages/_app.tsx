import type { AppProps } from 'next/app'

import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.800">
        <Header />
        <Box p="30">
          <Component {...pageProps} />
        </Box>
      </Box>
    </ChakraProvider>
  )
}
export default MyApp
