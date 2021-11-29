import React, { memo } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const TopElement = ({ data, filter }) => {
  console.log('elemRender', data);
  const MotionFlex = motion(Flex);
  return (
    <MotionFlex
      alignItems="flex-start"
      marginBottom={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {data.img && (
        <Image
          src={data.img}
          boxSize="2.5rem"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/50"
          marginRight={1}
          alignSelf="center"
        />
      )}

      <Flex flexDir="column">
        <Text maxW={52} isTruncated>
          {data.name}
        </Text>
        {filter === 'count' && <Text>{data.count} Total</Text>}
        {filter === 'rating' && (
          <Text>avg: {data.avgRating.toPrecision(3)}</Text>
        )}
      </Flex>
    </MotionFlex>
  );
};

export default memo(TopElement, (next, prev) => next.filter === prev.filter);
