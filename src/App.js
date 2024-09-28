// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';
import CalendarPage from './components/CalendarPage';
import MainPage from './components/MainPage';
import BudgetManagerPage from './components/BudgetManagerPage';

function App() {
  const [budget, setBudget] = useState(0); // Total budget
  const [remaining, setRemaining] = useState(0); // Remaining balance
  const [transactions, setTransactions] = useState([]); // Record of all transactions

  // Function to add money to the budget
  const addBudget = (amount) => {
    setBudget(budget + amount);
    setRemaining(remaining + amount);
    const newTransaction = {
      description: 'Added Budget',
      amount: amount,
      currentBalance: remaining + amount,
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Function to add an activity and subtract from the budget
  const addActivity = (activityName, cost) => {
    if (cost <= remaining) {
      setRemaining(remaining - cost);
      const newTransaction = {
        description: activityName,
        amount: -cost,
        currentBalance: remaining - cost,
      };
      setTransactions([...transactions, newTransaction]);
    }
  };

  return (
    <Router>
      <Box p={5}>
        {/* Navigation Links */}
        <Heading textAlign="center" mb={6}>FriendLink: College Hangout Planner</Heading>
        <Box textAlign="center" mb={6}>
          <Button as={Link} to="/" mr={4} colorScheme="blue">Home</Button>
          <Button as={Link} to="/calendar" mr={4} colorScheme="blue">Calendar</Button>
          <Button as={Link} to="/budget" colorScheme="blue">Budget</Button>
        </Box>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainPage budget={budget} remaining={remaining} transactions={transactions} />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route
            path="/budget"
            element={
              <BudgetManagerPage
                budget={budget}
                remaining={remaining}
                transactions={transactions}
                addBudget={addBudget}
                addActivity={addActivity}
              />
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
