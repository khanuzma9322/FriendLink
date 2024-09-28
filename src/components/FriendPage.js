import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Button, Input, List, ListItem, Heading } from '@chakra-ui/react';

function FriendsPage() {
  const [friends, setFriends] = useState(['Alice', 'Bob', 'Charlie']); // Sample friends list
  const [newFriend, setNewFriend] = useState(''); // State to hold the new friend's name

  const addFriend = () => {
    if (newFriend && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend]);
      setNewFriend(''); // Clear the input field after adding
    } else {
      alert('Please enter a valid name or this friend is already added.');
    }
  };

  return (
    <Box p={9}>
      <Heading textAlign="center" mb={6}>Friends List</Heading>
      <VStack spacing={4} align="start">
        <List spacing={2} width="100%">
          {friends.map((friend, index) => (
            <ListItem key={index} p={2} borderWidth="1px" borderRadius="md" bg="gray.50">
              {friend}
            </ListItem>
          ))}
        </List>
        
        <HStack spacing={4}>
          <Input
            placeholder="Add a Friend"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
          />
          <Button colorScheme="blue" onClick={addFriend}>Add Friend</Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default FriendsPage;