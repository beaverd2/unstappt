import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Container, Text } from '@chakra-ui/react';

const Statistics = ({ beers }) => {
  console.log('stats', beers.length);
  console.log('stats', beers);
  const beersCount = beers.length;
  const stylesCount = [...new Set(beers.map(beer => beer.beer.beer_style))]
    .length;
  const breweriesCount = [
    ...new Set(beers.map(beer => beer.brewery.brewery_name)),
  ].length;
  const countriesCount = [
    ...new Set(beers.map(beer => beer.brewery.country_name)),
  ].length;
  const avgRating = (
    beers.reduce((acc, cur) => acc + cur.rating_score, 0) / beers.length
  ).toPrecision(3);
  console.log(avgRating);
  return (
    <Flex>
      <Container maxW="container.sm">
        <Flex
          bgColor="white"
          p={2}
          shadow="base"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Flex flexDir="column" alignItems="center">
            <Text size="sm">Check-ins</Text>
            <Text size="sm" fontWeight="700">
              {beersCount}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text size="sm">Styles</Text>
            <Text size="sm" fontWeight="700">
              {stylesCount}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text size="sm">Breweries</Text>
            <Text size="sm" fontWeight="700">
              {breweriesCount}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text size="sm">Countries</Text>
            <Text size="sm" fontWeight="700">
              {countriesCount}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text size="sm">Avg Rating</Text>
            <Text size="sm" fontWeight="700">
              {avgRating}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Statistics;
