import React, { memo } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import Activity from './Activity';

const ActivityContainer = ({ beers, startDate, endDate, isLoading }) => {
  return (
    <Flex marginTop={4}>
      <Flex
        bgColor="white"
        p={2}
        shadow="base"
        flexDirection="column"
        mx="auto"
        width="100%"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Heading size="sm">Activity</Heading>
        </Flex>
        <Flex alignSelf="center" w="100%">
          {isLoading && <Skeleton height={56} width="100%" />}
          {beers && !isLoading && (
            <Activity beers={beers} startDate={startDate} endDate={endDate} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(ActivityContainer);
