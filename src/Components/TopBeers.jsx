import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopBeers = ({ beersData, isLoading }) => {
  const [isCompact, setIsCompact] = useState(true);
  const [beers, setBeers] = useState([]);

  const handleIsCompact = () => {
    setIsCompact(false);
  };

  useEffect(() => {
    setIsCompact(true);
    if (beersData) {
      const sorted = [...beersData].sort(
        (a, b) => (a.rating_score < b.rating_score && 1) || -1
      );
      setBeers(sorted);
    }
  }, [beersData]);

  console.log('wtf', beers);
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
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Heading size="sm">Top Beers</Heading>
      </Flex>
      <AnimatePresence>
        {beers &&
          !isLoading &&
          (isCompact
            ? beers.slice(0, 5).map(beer => (
                <TopElement
                  key={beer.beer.beer_name}
                  data={{
                    img: beer.beer.beer_label,
                    name: beer.beer.beer_name,
                    brewery: beer.brewery.brewery_name,
                    rating: beer.rating_score,
                    url:
                      '/b/' + beer.brewery.brewery_slug + '/' + beer.beer.bid,
                  }}
                  type="beer"
                  filter="rating"
                />
              ))
            : beers.map(beer => (
                <TopElement
                  key={beer.beer.beer_name}
                  data={{
                    img: beer.beer.beer_label,
                    name: beer.beer.beer_name,
                    brewery: beer.brewery.brewery_name,
                    rating: beer.rating_score,
                    url:
                      '/b/' + beer.brewery.brewery_slug + '/' + beer.beer.bid,
                  }}
                  type="beer"
                  filter="rating"
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(beer => (
            <TopElement key={beer} skeleton />
          ))}
      </AnimatePresence>
      {!isLoading && isCompact && beers.length > 5 && (
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
    </Flex>
  );
};

export default memo(TopBeers);
