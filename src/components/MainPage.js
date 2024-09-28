// MainPage.js
import React from 'react';
import { Box, Grid, GridItem, Heading, VStack, HStack, Text, Button, Input } from '@chakra-ui/react';

function MainPage({ budget, remaining, transactions }) {
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
            <Input placeholder="Propose Date and Time"/>
            <Input placeholder="Select Location"/>
            <HStack spacing={4}>
              <Button colorScheme="green">Confirm</Button>
              <Button variant="outline">Cancel</Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Budget Summary</Heading>
          <VStack align="start" spacing={2}>
            <Text>💸 Current Budget: ${budget.toFixed(2)}</Text>
            <Text>Remaining Balance: ${remaining.toFixed(2)}</Text>
            <Heading size="sm" mt={4}>Transaction Summary</Heading>
            {transactions.map((transaction, index) => (
              <HStack key={index} justify="space-between" w="100%">
                <Text>{transaction.description}</Text>
                <Text>{transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}</Text>
                <Text>Balance: ${transaction.currentBalance.toFixed(2)}</Text>
              </HStack>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default MainPage;
