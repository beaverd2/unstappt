import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select, Button, Switch } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopStyles = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('count');
  const [isCompact, setIsCompact] = useState(true);
  const [styles, setStyles] = useState([]);
  const [isFull, setIsFull] = useState(true);

  const handleSelect = e => {
    setFilter(e.target.value);
    e.target.value === 'count'
      ? setStyles(styles.sort((a, b) => (a.count < b.count && 1) || -1))
      : setStyles(
          styles.sort((a, b) => (a.avgRating < b.avgRating && 1) || -1)
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
            style_name: e.target.checked
              ? beer.beer.beer_style
              : beer.beer.beer_style.split('-')[0],
            // brewery_label: beer.brewery.brewery_label,
            rating: beer.rating_score,
          };
        })
        .reduce((obj, { style_name, rating }) => {
          if (obj[style_name] === undefined)
            obj[style_name] = {
              style_name: style_name,
              // brewery_label: brewery_label,
              sumRating: rating,
              avgRating: rating,
              count: 1,
            };
          else {
            obj[style_name].count++;
            obj[style_name].sumRating += rating;
            obj[style_name].avgRating =
              obj[style_name].sumRating / obj[style_name].count;
          }
          return obj;
        }, {})
    );
    filter === 'count'
      ? setStyles(style.sort((a, b) => (a.count < b.count && 1) || -1))
      : setStyles(style.sort((a, b) => (a.avgRating < b.avgRating && 1) || -1));
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
              style_name: beer.beer.beer_style,
              // brewery_label: beer.brewery.brewery_label,
              rating: beer.rating_score,
            };
          })
          .reduce((obj, { style_name, rating }) => {
            if (obj[style_name] === undefined)
              obj[style_name] = {
                style_name: style_name,
                // brewery_label: brewery_label,
                sumRating: rating,
                avgRating: rating,
                count: 1,
              };
            else {
              obj[style_name].count++;
              obj[style_name].sumRating += rating;
              obj[style_name].avgRating =
                obj[style_name].sumRating / obj[style_name].count;
            }
            return obj;
          }, {})
      );
      setStyles(styles.sort((a, b) => (a.count < b.count && 1) || -1));
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
      <AnimatePresence>
        {styles &&
          !isLoading &&
          (isCompact
            ? styles.slice(0, 5).map(style => (
                <TopElement
                  key={style.style_name}
                  data={{
                    name: style.style_name,
                    count: style.count,
                    avgRating: style.avgRating,
                  }}
                  filter={filter}
                />
              ))
            : styles.map(style => (
                <TopElement
                  key={style.style_name}
                  data={{
                    name: style.style_name,
                    count: style.count,
                    avgRating: style.avgRating,
                  }}
                  filter={filter}
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(style => (
            <TopElement key={style} skeleton />
          ))}
      </AnimatePresence>
      {isCompact && !isLoading && styles.length > 5 && (
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
