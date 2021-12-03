import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Container, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const Header = ({ fetchAll }) => {
  const [search, setSearch] = useState('');
  const handleInput = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    fetchAll(search);
    setSearch('');
  };
  return (
    <Box bgColor="#FFBA2E" w="100%">
      <Container maxW="container.sm">
        <Flex height={12} alignItems="center" justifyContent="space-between">
          {}
          <Heading>Unstappt</Heading>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="username"
              size="xs"
              bgColor="white"
              maxW={36}
              borderRadius="md"
              value={search}
              onChange={handleInput}
            />
          </form>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
