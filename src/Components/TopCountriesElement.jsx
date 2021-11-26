import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Text } from '@chakra-ui/react';

const TopCountriesElement = ({ country }) => {
  return (
    <Flex alignItems="flex-start" marginBottom={4}>
      <Image
        boxSize="2.5rem"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/50"
        marginRight={1}
        alignSelf="center"
      />

      <Flex flexDir="column">
        <Text maxW={52} isTruncated>
          {country}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopCountriesElement;
