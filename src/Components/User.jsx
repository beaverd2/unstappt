import { Flex, Link } from '@chakra-ui/layout';
import React, { memo } from 'react';
import { Avatar, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton, SkeletonCircle } from '@chakra-ui/react';

const User = ({ user, isLoading }) => {
  console.log('user');
  if (user && !isLoading) {
    return (
      <Flex mb={2} mt={4}>
        <Flex
          bgColor="white"
          p={2}
          shadow="base"
          mx="auto"
          width="100%"
          borderRadius="base"
        >
          <Avatar
            src={user.user_avatar}
            size="lg"
            marginRight={2}
            alignSelf="center"
          />
          <Flex flexGrow="1" flexDir="column">
            <Flex justifyContent="space-between">
              <Flex flexDir="column">
                <Flex>
                  <Text>{user.first_name + ' ' + user.last_name}</Text>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  {user.user_name}
                </Text>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Text>Total</Text>
                <Text fontWeight="700">{user.stats.total_checkins}</Text>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Text>Unique</Text>
                <Text fontWeight="700">{user.stats.total_beers}</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="gray.500" maxW={40} isTruncated>
                {user.bio}
              </Text>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://untappd.com/user/' + user.user_name}
              >
                <ChevronRightIcon w={6} h={6} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex mb={2} mt={4}>
        <Flex bgColor="white" p={2} shadow="base" mx="auto" width="100%">
          <SkeletonCircle size="16" marginRight={2} alignSelf="center" />
          <Flex flexGrow="1" flexDir="column">
            <Flex justifyContent="space-between">
              <Flex flexDir="column">
                <Skeleton height={5} width={20} mb={2}></Skeleton>
                <Skeleton height={4} width={14}></Skeleton>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Skeleton height={5} width={12} mb={2}></Skeleton>
                <Skeleton height={5} width={10}></Skeleton>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Skeleton height={5} width={12} mb={2}></Skeleton>
                <Skeleton height={5} width={10}></Skeleton>
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Skeleton height={4} width={44} mt={1}></Skeleton>
              <ChevronRightIcon w={6} h={6} mt={1} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
  return null;
};

export default memo(User);
