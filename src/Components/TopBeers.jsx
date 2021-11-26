import React, { memo } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Container, Image, Text } from '@chakra-ui/react';
import TopBeerElement from './TopBeerElement';

const TopBeers = ({ beers }) => {
  const topFiveBeers = beers
    .sort((a, b) => (a.rating_score < b.rating_score && 1) || -1)
    .slice(0, 5);
  console.log(topFiveBeers);
  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Top Beers</Heading>
          </Flex>
          {topFiveBeers.map(beer => (
            <TopBeerElement key={beer.beer.beer_name} beer={beer} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default memo(TopBeers);
