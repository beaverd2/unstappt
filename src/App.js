import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  Flex,
  Container,
  Center,
  Link,
} from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import Header from './Components/Header';
import User from './Components/User';
import DrinkingPattern from './Components/DrinkingPattern';
import axios from 'axios';
import TopBeers from './Components/TopBeers';
import TopRegions from './Components/TopRegions';
import TopStyles from './Components/TopStyles';
import dayjs from 'dayjs';
import Statistics from './Components/Statistics';
import DatePickerContainer from './Components/DatePickerContainer';
import ActivityContainer from './Components/Activity/ActivityContainer';
import Sessions from './Components/Sessions';
import BeerTable from './Components/BeerTable';
import TopCountries from './Components/TopCountries';
import TopBreweries from './Components/TopBreweries';

function App() {
  const [beers, setBeers] = useState(null);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'days').$d);
  const [endDate, setEndDate] = useState(dayjs().$d);
  const [isLoading, setIsLoading] = useState(false);
  const auth = `&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

  const fetchBeers = async url => {
    setIsLoading(true);
    const fullUrl = url + auth;
    try {
      const response = await axios.get(fullUrl);
      const data = response.data.response;
      const beers = data.beers.items;
      if (data.total_count > 50) {
        let endpoints = [
          ...Array(Math.floor(data.total_count / 50)).keys(),
        ].map(key => fullUrl + '&offset=' + (key + 1) * 50);
        const allResponses = await axios.all(
          endpoints.map(endpoint => axios.get(endpoint))
        );
        const allBeers = allResponses
          .map(response => response.data.response.beers.items)
          .reduce((a, b) => a.concat(b), []);
        return beers.concat(allBeers);
      } else {
        return beers;
      }
    } catch (error) {
      return { message: error?.response.data.meta.error_detail };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async username => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.untappd.com/v4/user/info/${username}?` + auth
      );
      const user = response.data.response.user;
      return user;
    } catch (error) {
      return { message: error?.response.data.meta.error_detail };
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAll = async username => {
    const now = dayjs();
    const weekAgo = dayjs().subtract(7, 'days');
    const user = await fetchUser(username);
    const allBeers = await fetchBeers(
      `https://api.untappd.com/v4/user/beers/${username}?limit=50&start_date=${weekAgo.format(
        'YYYY-MM-DD'
      )}&end_date=${now.format('YYYY-MM-DD')}`
    );
    if (user.message || allBeers.message) {
      Notification(user.message || allBeers.message);
    }
    if (!user.message && !allBeers.message) {
      setStartDate(weekAgo.$d);
      setEndDate(now.$d);
      setUser(user);
      setBeers(allBeers);
    }
  };

  const fetchBeersForRange = async (startDate, endDate) => {
    const allBeers = await fetchBeers(
      `https://api.untappd.com/v4/user/beers/${
        user.user_name
      }?limit=50&start_date=${dayjs(startDate).format(
        'YYYY-MM-DD'
      )}&end_date=${dayjs(endDate).format('YYYY-MM-DD')}`
    );
    if (allBeers.message) {
      Notification(user.message || allBeers.message);
    }
    if (!user.message && !allBeers.message) {
      setStartDate(startDate);
      setEndDate(endDate);
      setBeers(allBeers);
    }
  };

  const Notification = message => {
    const toast = createStandaloneToast({});

    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });

    return <></>;
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex bg="gray.100" flexDir="column" flexWrap="wrap" minH="100vh">
        <Header fetchAll={fetchAll} />
        {(beers || isLoading) && (
          <>
            <Container maxW={['container.sm', 'container.md', 'container.lg']}>
              <User isLoading={isLoading} user={user} />
              <DatePickerContainer
                fetchBeersForRange={fetchBeersForRange}
                isLoading={isLoading}
              />
              <Statistics beers={beers} isLoading={isLoading} />
              <ActivityContainer
                isLoading={isLoading}
                beers={beers}
                startDate={startDate}
                endDate={endDate}
              />
              <Flex
                flexWrap="wrap"
                justifyContent="space-between"
                gridColumnGap={2}
                alignItems="flex-start"
              >
                <TopBeers beersData={beers} isLoading={isLoading} />
                <TopBreweries beers={beers} isLoading={isLoading} />
                <TopStyles beers={beers} isLoading={isLoading} />
                <TopCountries beers={beers} isLoading={isLoading} />
                <TopRegions beers={beers} isLoading={isLoading} />
              </Flex>
              <DrinkingPattern beers={beers} isLoading={isLoading} />
              <Sessions beers={beers} isLoading={isLoading} />
              <BeerTable beers={beers} isLoading={isLoading} user={user} />
            </Container>
          </>
        )}
        <Center py={4} mt="auto">
          Author:&nbsp;
          <Link
            color="blue.400"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/beaverd2"
          >
            beaverd2
          </Link>
        </Center>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
