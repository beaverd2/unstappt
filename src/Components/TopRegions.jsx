import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopList from './TopList/TopList';

const TopRegions = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [regions, setRegions] = useState([]);

  const showButton = !isLoading && isCompact && regions.length > 5;

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setRegions(
          [...regions].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
          )
        )
      : setRegions(
          [...regions].sort(
            (a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name)
          )
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
              name:
                beer.brewery.location.brewery_state === ''
                  ? 'Other'
                  : beer.brewery.location.brewery_state,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { name, rating }) => {
            if (obj[name] === undefined)
              obj[name] = {
                name: name,
                sumRating: rating,
                avgRating: rating,
                count: 1,
              };
            else {
              obj[name].count++;
              obj[name].sumRating += rating;
              obj[name].avgRating = obj[name].sumRating / obj[name].count;
            }
            return obj;
          }, {})
      );
      setRegions(
        regions.sort(
          (a, b) => b.count - a.count || a.name.localeCompare(b.name)
        )
      );
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
      borderRadius="base"
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
      <TopList
        data={regions}
        isLoading={isLoading}
        isCompact={isCompact}
        filter={filter}
      />
      {showButton > 5 && (
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
