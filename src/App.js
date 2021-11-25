import React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Header from './Components/Header';
import User from './Components/User';
import { beers, user } from './MockApi';
import Styles from './Components/Styles';
import DrinkingPattern from './Components/DrinkingPattern';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex bg="gray.100" flexDir="column">
        <Header />
        <User user={user.response.user} />
        <Styles beers={beers.response.beers} />
        <DrinkingPattern beers={beers.response.beers} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
