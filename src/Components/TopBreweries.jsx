import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button } from '@chakra-ui/react';
import TopList from './TopList/TopList';

const TopBreweries = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [breweries, setBreweries] = useState([]);

  const showButton = !isLoading && isCompact && breweries.length > 5;

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setBreweries(
          [...breweries].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
          )
        )
      : setBreweries(
          [...breweries].sort(
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
      const breweries = Object.values(
        beers
          .map(beer => {
            return {
              name: beer.brewery.brewery_name,
              name2: beer.brewery.country_name,
              img: beer.brewery.brewery_label,
              url: beer.brewery.brewery_page_url,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { name, img, rating, url, name2 }) => {
            if (obj[name] === undefined)
              obj[name] = {
                name: name,
                name2: name2,
                img: img,
                url: url,
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

      setBreweries(
        breweries.sort(
          (a, b) => b.count - a.count || a.name.localeCompare(b.name)
        )
      );
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
      <TopList
        data={breweries}
        isLoading={isLoading}
        isCompact={isCompact}
        filter={filter}
        hoverable
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

export default memo(TopBreweries);
