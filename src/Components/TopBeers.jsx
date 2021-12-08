import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import TopBeerElement from './TopBeerElement';

const TopBeers = ({ beers, isLoading }) => {
  const [isCompact, setIsCompact] = useState(true);

  const handleIsCompact = () => {
    setIsCompact(false);
  };

  useEffect(() => {
    setIsCompact(true);
  }, [beers]);
  // console.log('beers', beers);

  return (
    <Flex
      bgColor="white"
      p={2}
      shadow="base"
      flexDirection="column"
      width={['100%', '49%']}
      marginTop={4}
      borderRadius="base"
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Top Beers</Heading>
      </Flex>

      {beers &&
        !isLoading &&
        (isCompact
          ? beers
              .sort((a, b) => (a.rating_score < b.rating_score && 1) || -1)
              .slice(0, 5)
              .map(beer => (
                <TopBeerElement key={beer.beer.beer_name} beer={beer} />
              ))
          : beers
              .sort((a, b) => (a.rating_score < b.rating_score && 1) || -1)
              .map(beer => (
                <TopBeerElement key={beer.beer.beer_name} beer={beer} />
              )))}

      {isLoading &&
        Array.from(Array(5).keys()).map(beer => (
          <TopBeerElement key={beer} beer={'skeleton'} />
        ))}

      {beers && !isLoading && isCompact && (
        <Button
          onClick={handleIsCompact}
          size="xs"
          alignSelf="center"
          width={24}
          variant="outline"
          mt="auto"
        >
          Load more
        </Button>
      )}
      {isLoading}
    </Flex>
  );
};

export default memo(TopBeers);
