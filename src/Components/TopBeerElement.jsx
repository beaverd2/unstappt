import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Text } from '@chakra-ui/react';

const TopBeerElement = ({ beer }) => {
  return (
    <Flex alignItems="flex-start" marginBottom={4}>
      <Image
        src={beer.beer.beer_label}
        boxSize="2.5rem"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/50"
        marginRight={1}
        alignSelf="center"
      />

      <Flex flexDir="column">
        <Text maxW={52} isTruncated>
          {beer.beer.beer_name}
        </Text>
        <Text maxW={52} isTruncated>
          {beer.brewery.brewery_name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopBeerElement;
