import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Container, Avatar, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const User = ({ user }) => {
  return (
    <Flex>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base">
          <Avatar size="lg" marginRight={2} alignSelf="center" />
          <Flex flexGrow="1" flexDir="column">
            <Flex justifyContent="space-between">
              <Flex flexDir="column">
                <Flex>
                  <Text size="lg" marginRight={1}>
                    {user.first_name}
                  </Text>
                  <Text size="lg">{user.last_name}</Text>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  {user.user_name}
                </Text>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Text size="sm">Total</Text>
                <Text size="sm" fontWeight="700">
                  {user.stats.total_checkins}
                </Text>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Text size="sm">Unique</Text>
                <Text size="sm" fontWeight="700">
                  {user.stats.total_beers}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text size="xs" color="gray.500" maxW={40} isTruncated>
                {user.bio}
              </Text>
              <ChevronRightIcon w={6} h={6} />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default User;
