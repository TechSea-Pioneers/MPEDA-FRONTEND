import React, { useState , useRef} from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Container,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

const Chatbot = () => {

  const [usermessage, setUsermessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to the chatbot!',
      sender: 'bot',
    },
  ]);
  const [history, setHistory] = useState(['']);
  const endpoint = process.env.REACT_APP_BACKEND_URL;

  const handleSendMessage = async () => {
    if (usermessage === '') {
      return;
    }

    setLoading(true);

    setMessages([...messages, { text: usermessage, sender: 'user' }]);
    setHistory([...history, usermessage]);

    try {
      const response = await axios.post(endpoint + '/chatbot', {
        body: JSON.stringify({
          messageResponse: usermessage,
          history: history,
        }),
      });


      console.log("Response Data:", response.data.messageResponse);  // Log to inspect the structure
      const chatResult = response.data.messageResponse.response;  // Extract the 'response' property
      setMessages([...messages, { text: usermessage, sender: 'user' }, { text: chatResult, sender: 'bot' }]);
      setHistory([...history, usermessage, chatResult]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUsermessage('');

    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Heading mb={4}>Chatbot</Heading>
      <VStack
        spacing={4}
        border="1px"
        borderRadius="md"
        p={4}
        width="100%"
        maxW="md"
        height="50vh"
        overflowY="auto"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Text
              bg={message.sender === 'user' ? 'blue.500' : 'gray.300'}
              color={message.sender === 'user' ? 'white' : 'black'}
              p={2}
              borderRadius="md"
            >
              {message.text}
            </Text>
          </Box>
        ))}
      </VStack>
      <Box display="flex" width="100%" maxW="md" mt={4}>
        <Input
          flex={1}
          value={usermessage}
          onChange={(e) => setUsermessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <Button ml={2} onClick={handleSendMessage} colorScheme="blue" isLoading={loading}>
          {loading ? <Spinner /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default Chatbot;
