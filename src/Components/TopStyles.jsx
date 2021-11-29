import React, { memo, useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Container, Select, Button, Switch } from '@chakra-ui/react';
import TopElement from './TopElement';
import { AnimatePresence } from 'framer-motion';

const TopStyles = ({ beers }) => {
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
  }, [beers]);

  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Top Styles</Heading>
            <Switch isChecked={isFull} onChange={handleIsFull} />
            <Select
              maxW={28}
              size="xs"
              variant="filled"
              onChange={handleSelect}
              value={filter}
            >
              <option value="count">By Count</option>
              <option value="rating">By Rating</option>
            </Select>
          </Flex>
          <AnimatePresence>
            {isCompact
              ? styles.slice(0, 5).map(style => (
                  <TopElement
                    key={style.style_name}
                    data={{
                      // img: beer.brewery_label,
                      name: style.style_name,
                      count: style.count,
                      avgRating: style.avgRating,
                    }}
                    filter={filter}
                    type="brewery"
                  />
                ))
              : styles.map(style => (
                  <TopElement
                    key={style.style_name}
                    data={{
                      // img: beer.brewery_label,
                      name: style.style_name,
                      count: style.count,
                      avgRating: style.avgRating,
                    }}
                    filter={filter}
                  />
                ))}
          </AnimatePresence>
          {isCompact && styles.length > 5 && (
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
      </Container>
    </Flex>
  );
};

export default memo(TopStyles);
