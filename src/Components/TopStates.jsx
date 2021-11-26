import React, { memo } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Container, Image, Text } from '@chakra-ui/react';
import TopBeerElement from './TopBeerElement';
import TopCountriesElement from './TopCountriesElement';

const TopStates = ({ beers }) => {
  const states = beers
    .map(beer => beer.brewery.location.brewery_state)
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  const topStates = Object.fromEntries(
    Object.entries(states)
      .sort(([, a], [, b]) => b - a)
      .filter(([key, value]) => key !== '')
  );

  const topFiveStates = Object.keys(topStates).slice(0, 5);

  console.log(states);
  console.log(topFiveStates);
  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Top States</Heading>
          </Flex>
          {topFiveStates.map(state => (
            <TopCountriesElement key={state} country={state} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default memo(TopStates);
