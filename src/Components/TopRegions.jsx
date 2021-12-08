import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopRegions = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [regions, setRegions] = useState([]);

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setRegions(regions.sort((a, b) => (a.count < b.count && 1) || -1))
      : setRegions(
          regions.sort((a, b) => (a.avgRating < b.avgRating && 1) || -1)
        );
  };
  const handleIsCompact = () => {
    setIsCompact(false);
  };
  useEffect(() => {
    setIsCompact(true);
    setFilter('count');
    if (beers) {
      const regions = Object.values(
        beers
          .map(beer => {
            return {
              region_name:
                beer.brewery.location.brewery_state === ''
                  ? 'Other'
                  : beer.brewery.location.brewery_state,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { region_name, rating }) => {
            if (obj[region_name] === undefined)
              obj[region_name] = {
                region_name: region_name,
                sumRating: rating,
                avgRating: rating,
                count: 1,
              };
            else {
              obj[region_name].count++;
              obj[region_name].sumRating += rating;
              obj[region_name].avgRating =
                obj[region_name].sumRating / obj[region_name].count;
            }
            return obj;
          }, {})
      );
      setRegions(regions.sort((a, b) => (a.count < b.count && 1) || -1));
    }
  }, [beers]);
  console.log('regions', regions);
  return (
    <Flex
      bgColor="white"
      p={2}
      shadow="base"
      flexDirection="column"
      width="100%"
      marginTop={4}
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Top Regions/States</Heading>
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
        {regions &&
          !isLoading &&
          (isCompact
            ? regions.slice(0, 5).map(region => (
                <TopElement
                  key={region.region_name}
                  data={{
                    name: region.region_name,
                    count: region.count,
                    avgRating: region.avgRating,
                  }}
                  filter={filter}
                />
              ))
            : regions.map(region => (
                <TopElement
                  key={region.region_name}
                  data={{
                    name: region.region_name,
                    count: region.count,
                    avgRating: region.avgRating,
                  }}
                  filter={filter}
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(region => (
            <TopElement key={region} skeleton />
          ))}
      </AnimatePresence>
      {!isLoading && isCompact && regions.length > 5 && (
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
  );
};

export default memo(TopRegions);
