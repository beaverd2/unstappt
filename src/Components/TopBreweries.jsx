import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopBreweries = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [breweries, setBreweries] = useState([]);

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setBreweries(breweries.sort((a, b) => (a.count < b.count && 1) || -1))
      : setBreweries(
          breweries.sort((a, b) => (a.avgRating < b.avgRating && 1) || -1)
        );
  };
  const handleIsCompact = () => {
    setIsCompact(false);
  };

  useEffect(() => {
    setIsCompact(true);
    setFilter('count');
    if (beers) {
      const breweries = Object.values(
        beers
          .map(beer => {
            return {
              brewery_name: beer.brewery.brewery_name,
              brewery_label: beer.brewery.brewery_label,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { brewery_name, brewery_label, rating }) => {
            if (obj[brewery_name] === undefined)
              obj[brewery_name] = {
                brewery_name: brewery_name,
                brewery_label: brewery_label,
                sumRating: rating,
                avgRating: rating,
                count: 1,
              };
            else {
              obj[brewery_name].count++;
              obj[brewery_name].sumRating += rating;
              obj[brewery_name].avgRating =
                obj[brewery_name].sumRating / obj[brewery_name].count;
            }
            return obj;
          }, {})
      );

      setBreweries(breweries.sort((a, b) => (a.count < b.count && 1) || -1));
    }
  }, [beers]);

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
        <Heading size="sm">Top Breweries</Heading>
        <Select
          maxW={28}
          size="xs"
          variant="filled"
          onChange={handleSelect}
          value={filter}
          disabled={isLoading}
        >
          <option value="count">By Count</option>
          <option value="rating">By Rating</option>
        </Select>
      </Flex>
      <AnimatePresence>
        {breweries &&
          !isLoading &&
          (isCompact
            ? breweries.slice(0, 5).map(brewery => (
                <TopElement
                  key={brewery.brewery_name}
                  data={{
                    img: brewery.brewery_label,
                    name: brewery.brewery_name,
                    count: brewery.count,
                    avgRating: brewery.avgRating,
                  }}
                  filter={filter}
                />
              ))
            : breweries.map(brewery => (
                <TopElement
                  key={brewery.brewery_name}
                  data={{
                    img: brewery.brewery_label,
                    name: brewery.brewery_name,
                    count: brewery.count,
                    avgRating: brewery.avgRating,
                  }}
                  filter={filter}
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(brewery => (
            <TopElement key={brewery} skeleton />
          ))}
      </AnimatePresence>
      {!isLoading && isCompact && breweries.length > 5 && (
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

export default memo(TopBreweries);
