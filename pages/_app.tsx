import type { AppProps } from 'next/app'

import { ChakraProvider, Box } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.100">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
export default MyApp
