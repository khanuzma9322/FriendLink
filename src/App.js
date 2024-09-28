import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';
import CalendarPage from './components/CalendarPage';
import MainPage from './components/MainPage';  // Import the original main page

function App() {
  return (
    <Router>
      <Box p={5}>
        {/* Navigation Links */}
        <Heading textAlign="center" mb={6}>College Hangout Planner</Heading>
        <Box textAlign="center" mb={6}>
          <Button as={Link} to="/" mr={4} colorScheme="blue">Home</Button>
          <Button as={Link} to="/calendar" colorScheme="blue">Calendar</Button>
        </Box>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
