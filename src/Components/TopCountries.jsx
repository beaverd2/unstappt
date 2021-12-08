import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopCountries = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [countries, setCountries] = useState([]);

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setCountries(countries.sort((a, b) => (a.count < b.count && 1) || -1))
      : setCountries(
          countries.sort((a, b) => (a.avgRating < b.avgRating && 1) || -1)
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
              country_name: beer.brewery.country_name,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { country_name, rating }) => {
            if (obj[country_name] === undefined)
              obj[country_name] = {
                country_name: country_name,
                sumRating: rating,
                avgRating: rating,
                count: 1,
              };
            else {
              obj[country_name].count++;
              obj[country_name].sumRating += rating;
              obj[country_name].avgRating =
                obj[country_name].sumRating / obj[country_name].count;
            }
            return obj;
          }, {})
      );

      setCountries(countries.sort((a, b) => (a.count < b.count && 1) || -1));
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
      <AnimatePresence>
        {countries &&
          !isLoading &&
          (isCompact
            ? countries.slice(0, 5).map(country => (
                <TopElement
                  key={country.country_name}
                  data={{
                    name: country.country_name,
                    count: country.count,
                    avgRating: country.avgRating,
                  }}
                  filter={filter}
                />
              ))
            : countries.map(country => (
                <TopElement
                  key={country.country_name}
                  data={{
                    name: country.country_name,
                    count: country.count,
                    avgRating: country.avgRating,
                  }}
                  filter={filter}
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(country => (
            <TopElement key={country} skeleton />
          ))}
      </AnimatePresence>
      {!isLoading && isCompact && countries.length > 5 && (
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
