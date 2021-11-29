import React, { memo } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Text, Fade } from '@chakra-ui/react';

const TopBeerElement = ({ beer }) => {
  console.log(beer);
  return (
    <Fade in={true} transition={{ enter: { duration: 0.3 } }}>
      <Flex alignItems="flex-start" marginBottom={4}>
        <Image
          src={beer.beer.beer_label}
          boxSize="3rem"
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
          <Text>{beer.rating_score}</Text>
        </Flex>
      </Flex>
    </Fade>
  );
};

export default memo(TopBeerElement);
