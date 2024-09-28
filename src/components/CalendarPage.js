import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([
    {
      title: "John's Availability",
      start: new Date(2024, 8, 30, 10, 0),
      end: new Date(2024, 8, 30, 14, 0),
    },
    {
      title: "Sarah's Availability",
      start: new Date(2024, 8, 30, 12, 0),
      end: new Date(2024, 8, 30, 16, 0),
    },
    {
      title: "Your Availability",
      start: new Date(2024, 8, 30, 9, 0),
      end: new Date(2024, 8, 30, 12, 0),
    },
  ]);

  const [overlappingTimes, setOverlappingTimes] = useState([]);

  // Function to find overlapping times
  const findOverlappingTimes = (events) => {
    let overlap = [];
    // Sort by start time
    const sortedEvents = [...events].sort((a, b) => a.start - b.start);

    // Check for overlapping periods
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEvent = sortedEvents[i];
      const nextEvent = sortedEvents[i + 1];

      // If overlapping, calculate the overlap
      if (currentEvent.end > nextEvent.start) {
        const overlapStart = nextEvent.start;
        const overlapEnd = currentEvent.end < nextEvent.end ? currentEvent.end : nextEvent.end;
        overlap.push({ start: overlapStart, end: overlapEnd });
      }
    }
    return overlap;
  };

  // Update overlapping times whenever events change
  useEffect(() => {
    const overlaps = findOverlappingTimes(events);
    setOverlappingTimes(overlaps);
  }, [events]);

  // Handle adding a new event
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Choose a title for this hangout slot');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <Box p={5}>
      <Heading textAlign="center" mb={6}>Calendar</Heading>
      <VStack spacing={4}>
        {/* Calendar Component */}
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          defaultView="week"
          defaultDate={new Date(2024, 8, 30)}
          style={{ height: 500, width: '100%' }}
          onSelectSlot={handleSelectSlot}
        />

        {/* Display Overlapping Times */}
        <Box mt={4}>
          <Heading size="md">Overlapping Availability</Heading>
          {overlappingTimes.length > 0 ? (
            overlappingTimes.map((time, index) => (
              <Text key={index}>
                From: {moment(time.start).format('LT')} to {moment(time.end).format('LT')}
              </Text>
            ))
          ) : (
            <Text>No overlapping times available.</Text>
          )}
        </Box>

        <Button colorScheme="red" onClick={() => setEvents([])}>Clear Calendar</Button>
      </VStack>
    </Box>
  );
}

export default CalendarPage;
