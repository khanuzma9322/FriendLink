import React, {useState} from 'react';
import { Box, Grid, GridItem, Heading, VStack, Button, HStack, Input, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

function MainPage() {
  // State to store the list of friends and activities
  const [friends, setFriends] = useState([]);
  // State to store input values
  const [friendName, setFriendName] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  
  // Modal controls from Chakra UI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle adding a new friend
  const handleAddFriend = () => {
    if (friendName && friendActivity) {
      setFriends([...friends, { name: friendName, activity: friendActivity }]);
      setFriendName(''); // Reset input fields
      setFriendActivity('');
      onClose(); // Close the modal
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
