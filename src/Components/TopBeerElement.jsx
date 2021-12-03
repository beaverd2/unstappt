import React, { memo } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Text, Fade, Skeleton } from '@chakra-ui/react';

const TopBeerElement = ({ beer }) => {
  if (beer === 'skeleton') {
    return (
      <Fade in={true} transition={{ enter: { duration: 0.3 } }}>
        <Flex alignItems="flex-start" marginBottom={4}>
          <Skeleton w="3rem" h="3rem" marginRight={1} alignSelf="center" />

          <Flex w="80%" flexDir="column">
            <Skeleton h={4} mb={1} w="70%" />
            <Skeleton h={4} mb={1} w="30%" />
            <Skeleton h={4} w="15%" />
          </Flex>
        </Flex>
      </Fade>
    );
  }
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

        <Flex w="80%" flexDir="column">
          <Text isTruncated>{beer.beer.beer_name}</Text>
          <Text isTruncated>{beer.brewery.brewery_name}</Text>
          <Text>{beer.rating_score}</Text>
        </Flex>
      </Flex>
    </Fade>
  );
};

export default memo(TopBeerElement);
