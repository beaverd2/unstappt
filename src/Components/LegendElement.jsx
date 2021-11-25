import { Circle, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Text } from '@chakra-ui/react';

const LegendElement = ({ color, style, value }) => {
  return (
    <Flex alignItems="center">
      <Circle size={4} bg={color} marginRight={1}></Circle>
      <Text size="xs" marginRight={1}>{`(${value})`}</Text>
      <Text size="xs">{style}</Text>
    </Flex>
  );
};

export default LegendElement;
