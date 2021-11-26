import React, { memo } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Container, Image, Text } from '@chakra-ui/react';
import TopBeerElement from './TopBeerElement';
import TopCountriesElement from './TopCountriesElement';

const TopCountries = ({ beers }) => {
  const styles = beers
    .map(beer => beer.brewery.country_name)
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  const TopStyles = Object.fromEntries(
    Object.entries(styles).sort(([, a], [, b]) => b - a)
  );

  const TopFiveStyles = Object.keys(TopStyles).slice(0, 5);

  console.log(TopStyles);
  console.log(TopFiveStyles);
  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Top Countries</Heading>
          </Flex>
          {TopFiveStyles.map(country => (
            <TopCountriesElement key={country} country={country} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default memo(TopCountries);
