import React, { memo } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Skeleton, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const TopElement = ({ data, filter, skeleton, hoverable }) => {
  const MotionFlex = motion(Flex);
  console.log('elemRender', data, hoverable);

  const openInNewTab = url => {
    const newWindow = window.open(
      `https://untappd.com` + url,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  if (skeleton) {
    return (
      <MotionFlex
        alignItems="flex-start"
        marginBottom={4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Skeleton w="3rem" h="3rem" marginRight={1} alignSelf="center" />

        <Flex flexDir="column" w="80%">
          <Skeleton h={4} mb={3} w="70%" />
          <Skeleton h={4} w="20%" />
        </Flex>
      </MotionFlex>
    );
  }
  return (
    <MotionFlex
      alignItems="flex-start"
      marginBottom={4}
      backgroundColor="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={
        hoverable
          ? {
              backgroundColor: hoverable && '#EDF2F7',
              transition: { duration: 0.2 },
            }
          : {}
      }
      cursor={hoverable ? 'pointer' : 'auto'}
      onClick={() => data.url && openInNewTab(data.url)}
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

      <Flex flexDir="column" w="80%">
        <Text isTruncated>{data.name}</Text>
        <Text isTruncated>{data.name2 && data.name2}</Text>
        {filter === 'count' && <Text>{data.count} Total</Text>}
        {filter === 'rating' && data.avgRating && (
          <Text>avg: {data.avgRating.toPrecision(3)}</Text>
        )}
        {filter === 'rating' && data.rating && (
          <Text>rating: {data.rating.toPrecision(3)}</Text>
        )}
      </Flex>
    </MotionFlex>
  );
};

export default memo(
  TopElement,
  (next, prev) =>
    next.filter === prev.filter && next.data.count === prev.data.count
);
