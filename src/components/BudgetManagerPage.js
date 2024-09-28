// BudgetManagerPage.js
import React, { useState } from 'react';
import { Box, Button, Heading, Input, VStack, Text, HStack, Divider } from '@chakra-ui/react';

function BudgetManagerPage({ budget, remaining, transactions, addBudget, addActivity }) {
  const [budgetInput, setBudgetInput] = useState(''); // Input for adding budget
  const [activityName, setActivityName] = useState(''); // Input for activity name
  const [activityCost, setActivityCost] = useState(''); // Input for activity cost

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" maxWidth="500px" margin="auto">
      <Heading size="lg" mb={4} textAlign="center">Budget Manager</Heading>

      <VStack spacing={4}>
        {/* Display total and remaining budget */}
        <Text fontSize="lg">Total Budget: ${budget.toFixed(2)}</Text>
        <Text fontSize="lg" color={remaining >= 0 ? 'green.500' : 'red.500'}>
          Remaining: ${remaining.toFixed(2)}
        </Text>

        <Divider />

        {/* Section to add budget */}
        <Heading size="md">Add to Budget</Heading>
        <Input
          placeholder="Amount to Add"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          type="number"
        />
        <Button colorScheme="green" onClick={() => addBudget(parseFloat(budgetInput))}>
          Add Budget
        </Button>

        <Divider />

        {/* Section to add activities */}
        <Heading size="md">Add an Activity</Heading>
        <Input
          placeholder="Activity Name"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <Input
          placeholder="Cost of Activity"
          value={activityCost}
          onChange={(e) => setActivityCost(e.target.value)}
          type="number"
        />
        <Button colorScheme="blue" onClick={() => addActivity(activityName, parseFloat(activityCost))}>
          Add Activity
        </Button>

        <Divider />

        {/* Display a record of transactions */}
        <Heading size="md" mb={2}>Transaction History</Heading>
        <VStack align="start" w="100%">
          {transactions.map((transaction, index) => (
            <HStack key={index} justify="space-between" w="100%">
              <Text>{transaction.description}</Text>
              <Text>{transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}</Text>
              <Text>Balance: ${transaction.currentBalance.toFixed(2)}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default BudgetManagerPage;
