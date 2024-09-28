import React, {useState} from 'react';
import { Box, Grid, GridItem, Heading, VStack, Button, HStack, Input, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

function MainPage({ addEventAndActivity, budget, remaining, transactions }) {
  const [activityName, setActivityName] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEvent = () => {
    if (activityName && cost && date && time && location) {
      addEventAndActivity(activityName, parseFloat(cost), date, time, location);
      setActivityName('');
      setCost('');
      setDate('');
      setTime('');
      setLocation('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleAddFriend = () => {
    if (friendName && friendActivity) {
      setFriends([...friends, { name: friendName, activity: friendActivity }]);
      setFriendName('');
      setFriendActivity('');
      onClose();
    }
  }

  const handleDeleteFriend = (index) => {
    setFriends(friends.filter((_, i) => i !== index));
  }

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Friends & Activities</Heading>
          <VStack spacing={4}>
            {/* Friends and activities list here */}
            {/* Render the list of friends and their activities */}
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <Box
                  key={index}
                  p={3}
                  bg="white"
                  borderRadius="md"
                  shadow="md"
                  width="100%"
                  onClick={() => handleDeleteFriend(index)}
                  cursor="pointer"
                  _hover={{bg:"red.100"}}
                >
                  <Text><strong>{friend.name}</strong> is interested in <strong>{friend.activity}</strong></Text>
                </Box>
              ))
            ) : (
              <Text>No friends added yet.</Text>
            )}
          </VStack>
          <Button mt={4} colorScheme="blue" onClick={onOpen}>Add Friend +</Button>
        </GridItem>
        <GridItem colSpan={2} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Schedule a Hangout</Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Activity Name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
            <Input
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              type="number"
            />
            <Input
              placeholder="Propose Date (YYYY-MM-DD)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <Input
              placeholder="Propose Time (HH:MM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
            />
            <Input
              placeholder="Select Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <HStack spacing={4}>
              <Button colorScheme="green" onClick={handleAddEvent}>Confirm</Button>
              <Button variant="outline" onClick={() => {setActivityName(''); setCost(''); setDate(''); setTime(''); setLocation('')}}>Cancel</Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} bg="gray.100" p={5} borderRadius="md">
          <Heading size="md" mb={4}>Budget Summary</Heading>
          <VStack align="start" spacing={2}>
            <Text>💸 Current Budget: ${budget.toFixed(2)}</Text>
            <Text>Remaining Balance: ${remaining.toFixed(2)}</Text>
            <Heading size="sm" mt={4}>Transaction Summary</Heading>

            {/* Display each transaction in a white box with colored amounts */}
            {transactions.map((transaction, index) => (
            <Box 
                key={index} 
                p={4} 
                bg="white" 
                borderRadius="md" 
                w="100%" 
                boxShadow="md" 
            >
                <Grid templateColumns="1fr 1fr" alignItems="center" gap={4}>
                <Text textAlign="left">{transaction.description}</Text>
                <HStack justify="space-between" w="100%">
                    <Text 
                    color={transaction.amount >= 0 ? 'green.500' : 'red.500'}
                    fontWeight="bold"
                    textAlign="center"
                    flex="1"
                    >
                    {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </Text>
                    <Text textAlign="left">
                    Balance: ${transaction.currentBalance.toFixed(2)}
                    </Text>
                </HStack>
                </Grid>
            </Box>
            ))}


          </VStack>
        </GridItem>
      </Grid>

      {/* Modal for adding a friend */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Friend</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Friend's Name"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
              />
              <Input
                placeholder="Preferred Activity"
                value={friendActivity}
                onChange={(e) => setFriendActivity(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddFriend}>
              Add Friend
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MainPage;
