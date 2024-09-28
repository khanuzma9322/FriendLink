import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarPage({ events, setEvents }) {
  const [overlappingTimes, setOverlappingTimes] = useState([]);

  // Function to find overlapping times
  const findOverlappingTimes = (events) => {
    let overlap = [];
    const sortedEvents = [...events].sort((a, b) => a.start - b.start);

    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEvent = sortedEvents[i];
      const nextEvent = sortedEvents[i + 1];

      if (currentEvent.end > nextEvent.start) {
        const overlapStart = nextEvent.start;
        const overlapEnd =
          currentEvent.end < nextEvent.end ? currentEvent.end : nextEvent.end;
        overlap.push({ start: overlapStart, end: overlapEnd });
      }
    }
    return overlap;
  };

  useEffect(() => {
    const overlaps = findOverlappingTimes(events);
    setOverlappingTimes(overlaps);
  }, [events]);

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
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          defaultView="week"
          defaultDate={new Date()}
          style={{ height: 500, width: '100%' }}
          onSelectSlot={handleSelectSlot}
        />

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


