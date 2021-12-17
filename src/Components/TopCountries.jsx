import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopList from './TopList/TopList';

const TopCountries = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [countries, setCountries] = useState([]);

  const showButton = !isLoading && isCompact && countries.length > 5;

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setCountries(
          [...countries].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
          )
        )
      : setCountries(
          [...countries].sort(
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
      const countries = Object.values(
        beers
          .map(beer => {
            return {
              name: beer.brewery.country_name,
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

      setCountries(
        countries.sort(
          (a, b) => b.count - a.count || a.name.localeCompare(b.name)
        )
      );
    }
  }, [beers]);
  console.log('countries', countries);
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
        <Heading size="sm">Top Countries</Heading>
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
        data={countries}
        isLoading={isLoading}
        isCompact={isCompact}
        filter={filter}
      />
      {showButton && (
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

export default memo(TopCountries);
