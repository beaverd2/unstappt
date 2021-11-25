import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Container, Input } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Box bgColor="#FFBA2E" w="100%" marginBottom={4}>
      <Container maxW="container.sm">
        <Flex height={12} alignItems="center" justifyContent="space-between">
          <Heading>Unstappt</Heading>
          <Input
            placeholder="username"
            size="xs"
            bgColor="white"
            maxW={36}
            borderRadius="md"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
