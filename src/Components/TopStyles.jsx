import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button, Switch } from '@chakra-ui/react';
import TopList from './TopList/TopList';

const TopStyles = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [styles, setStyles] = useState([]);
  const [isFull, setIsFull] = useState(true);

  const showButton = !isLoading && isCompact && styles.length > 5;

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setStyles(
          [...styles].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
          )
        )
      : setStyles(
          [...styles].sort(
            (a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name)
          )
        );
  };
  const handleIsCompact = () => {
    setIsCompact(false);
  };
  const handleIsFull = e => {
    setIsFull(e.target.checked);
    const style = Object.values(
      beers
        .map(beer => {
          return {
            name: e.target.checked
              ? beer.beer.beer_style
              : beer.beer.beer_style.split('-')[0],
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
    filter === 'count'
      ? setStyles(
          [...style].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
          )
        )
      : setStyles(
          [...style].sort(
            (a, b) => b.avgRating - a.avgRating || a.name.localeCompare(b.name)
          )
        );
  };
  useEffect(() => {
    setIsCompact(true);
    setFilter('count');
    setIsFull(true);
    if (beers) {
      const styles = Object.values(
        beers
          .map(beer => {
            return {
              name: beer.beer.beer_style,
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
      setStyles(
        styles.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
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
        <Heading size="sm">Top Styles</Heading>
        <Switch
          isDisabled={isLoading}
          isChecked={isFull}
          onChange={handleIsFull}
        />
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
        data={styles}
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

export default memo(TopStyles);
