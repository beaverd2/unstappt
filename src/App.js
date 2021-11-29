import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  Flex,
  Select,
  Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Header from './Components/Header';
import User from './Components/User';
import { beers1, user1, beers50 } from './MockApi';
import Styles from './Components/Styles';
import DrinkingPattern from './Components/DrinkingPattern';
import axios from 'axios';
import TopBeers from './Components/TopBeers';
import TopCountries from './Components/TopCountries';
import TopRegions from './Components/TopRegions';
import TopBreweries from './Components/TopBreweries';
import TopStyles from './Components/TopStyles';
import dayjs from 'dayjs';
import Statistics from './Components/Statistics';

function App() {
  const [beers, setBeers] = useState(beers1.response.beers.items);
  const [user, setUser] = useState(user1.response.user);
  const auth = `&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;
  const fetchBeers = async (url, startDate, endDate) => {
    try {
      const response = await axios.get(url + auth);
      const data = response.data.response;
      const beers = data.beers.items;
      if (startDate && endDate && data.pagination.next_url) {
        return beers.concat(await fetchBeers(data.pagination.next_url));
      } else {
        return beers;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async username => {
    try {
      const response = await axios.get(
        `https://api.untappd.com/v4/user/info/${username}?` + auth
      );
      const user = response.data.response.user;
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAll = async username => {
    const now = dayjs().format('YYYY-MM-DD');
    const weekAgo = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
    const allBeers = await fetchBeers(
      `https://api.untappd.com/v4/user/beers/${username}?limit=50&start_date=${weekAgo}&end_date=${now}`
    );
    const user = await fetchUser(username);
    console.log('fetchAll', allBeers, user);
    setUser(user);
    setBeers(allBeers);
  };
  return (
    <ChakraProvider theme={theme}>
      <Flex bg="gray.100" flexDir="column" pb={4}>
        <Header fetchAll={fetchAll} />
        <User user={user} />
        <Container maxW="container.sm">
          <Select
            maxW={24}
            placeholder="last week"
            size="xs"
            bg="white"
            marginTop={4}
            marginLeft="auto"
          />
        </Container>
        <Statistics beers={beers} />
        <TopBeers beers={beers} />
        <TopBreweries beers={beers} />
        <TopStyles beers={beers} />
        <TopCountries beers={beers} />
        <TopRegions beers={beers} />
        <DrinkingPattern beers={beers} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
