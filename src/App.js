import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';
import './index.css';
import CalendarPage from './components/CalendarPage';
import MainPage from './components/MainPage';
import BudgetManagerPage from './components/BudgetManagerPage';
import FriendPage from './components/FriendPage';

function App() {
  const [budget, setBudget] = useState(0); // Total budget
  const [remaining, setRemaining] = useState(0); // Remaining balance
  const [transactions, setTransactions] = useState([]); // Record of all transactions
  const [events, setEvents] = useState([]); // Calendar events
  const [friends, setFriends] = useState([]); // Friends
  const [newFriend, setNewFriend] = useState('');
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

  // Function to handle adding an event and updating the budget
  const addEventAndActivity = (activityName, cost, date, time, location) => {
    if (cost <= remaining) {
      addActivity(activityName, cost);

      // Create a new event for the calendar
      const startDateTime = new Date(`${date}T${time}`);
      const newEvent = {
        title: `${activityName} at ${location}`,
        start: startDateTime,
        end: new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000), // Example: event lasts 2 hours
      };

      setEvents([...events, newEvent]);
    } else {
      alert('Not enough budget for this activity.');
    }
  };

  return (
    <Router>
      <Box p={5}>
        {/* Navigation Links */}
        {/* <Heading textAlign="center" mb={6}>FriendLink: College Hangout Planner</Heading> */}
        <Box textAlign="center" mb={6}>
          <img src={'friendlink_title.png'} alt="FriendLink logo" style={{ width: '450px', margin: '0 auto' }} />
        </Box>
        <Box textAlign="center" mb={6}>
          <Button as={Link} to="/" mr={4} colorScheme="blue">Home</Button>
          <Button as={Link} to="/calendar" mr={4} colorScheme="blue">Calendar</Button>
          <Button as={Link} to="/budget" mr = {4} colorScheme="blue">Budget</Button>
          <Button as={Link} to="/friends" colorScheme="blue">Friends</Button>
        </Box>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                addEventAndActivity={addEventAndActivity}
                budget={budget}
                remaining={remaining}
                transactions={transactions}
              />
            }
          />
          <Route path="/calendar" element={<CalendarPage events={events}  setEvents={setEvents} />} />
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
          <Route path="/friends" element={<FriendPage friends={friends} newFriend = {newFriend} setFriends={setFriends} setNewFriend={setNewFriend}/>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
