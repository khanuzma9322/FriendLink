import React from 'react';
import { Box, Grid, GridItem, Heading, VStack, Button, HStack, Input, Text } from '@chakra-ui/react';

function MainPage() {
  return (
    <Box p={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Friends & Activities</Heading>
          <VStack spacing={4}>
            {/* Friends and activities list here */}
          </VStack>
          <Button mt={4} colorScheme="blue">Add Friend +</Button>
        </GridItem>
        <GridItem colSpan={2} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Schedule a Hangout</Heading>
          <VStack spacing={4}>
            <Input placeholder="Propose Date and Time" />
            <Input placeholder="Select Location" />
            <HStack spacing={4}>
              <Button colorScheme="green">Confirm</Button>
              <Button variant="outline">Cancel</Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} bg="gray.50" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Budget Manager</Heading>
          <HStack spacing={4}>
            <Text>💸 Current Budget: $200</Text>
            <Button colorScheme="blue">Add Expense</Button>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default MainPage;
