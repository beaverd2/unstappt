import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';

const Statistics = ({ beers, isLoading }) => {
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    if (beers) {
      setStatistics({
        beersCount: beers.length,
        stylesCount: [...new Set(beers.map(beer => beer.beer.beer_style))]
          .length,
        breweriesCount: [
          ...new Set(beers.map(beer => beer.brewery.brewery_name)),
        ].length,
        countriesCount: [
          ...new Set(beers.map(beer => beer.brewery.country_name)),
        ].length,
        avgRating: (
          beers.reduce((acc, cur) => acc + cur.rating_score, 0) / beers.length
        ).toPrecision(3),
      });
    }
  }, [beers]);
  return (
    <Flex>
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        gridGap={4}
        mx="auto"
        width="100%"
      >
        {statistics && !isLoading && (
          <>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Text fontSize="lg">Check-ins</Text>
              <Text fontSize="lg" fontWeight="700">
                {statistics.beersCount}
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Text fontSize="lg">Styles</Text>
              <Text fontSize="lg" fontWeight="700">
                {statistics.stylesCount}
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Text fontSize="lg">Breweries</Text>
              <Text fontSize="lg" fontWeight="700">
                {statistics.breweriesCount}
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Text fontSize="lg">Countries</Text>
              <Text fontSize="lg" fontWeight="700">
                {statistics.countriesCount}
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Text fontSize="lg">Avg Rating</Text>
              <Text fontSize="lg" fontWeight="700">
                {statistics.avgRating}
              </Text>
            </Flex>
          </>
        )}
        {isLoading && (
          <>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Skeleton h={14} w="100%" />
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Skeleton h={14} w="100%" />
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Skeleton h={14} w="100%" />
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Skeleton h={14} w="100%" />
            </Flex>
            <Flex
              flexDir="column"
              alignItems="center"
              bgColor="white"
              p={2}
              shadow="base"
              flexBasis="40%"
              textAlign="center"
            >
              <Skeleton h={14} w="100%" />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Statistics;
