import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button, Container, Select } from '@chakra-ui/react';
import TopBeerElement from './TopBeerElement';

const TopBeers = ({ beers }) => {
  const [filter, setFilter] = useState('rating');
  const [isCompact, setIsCompact] = useState(true);

  const handleSelect = e => {
    setFilter(e.target.value);
  };
  const handleIsCompact = () => {
    setIsCompact(false);
  };
  const topBeers = beers.sort(
    (a, b) => (a.rating_score < b.rating_score && 1) || -1
  );
  const topFiveBeers = topBeers.slice(0, 5);
  console.log('topFiveBeers', topFiveBeers);

  useEffect(() => {
    setIsCompact(true);
  }, [beers]);
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
          {isCompact
            ? topFiveBeers.map(beer => (
                <TopBeerElement key={beer.beer.beer_name} beer={beer} />
              ))
            : topBeers.map(beer => (
                <TopBeerElement key={beer.beer.beer_name} beer={beer} />
              ))}
          {isCompact && (
            <Button
              onClick={handleIsCompact}
              size="xs"
              alignSelf="center"
              width={24}
              variant="outline"
            >
              Load more
            </Button>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

export default memo(TopBeers);
