import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('login'); // State variable to control which page to display

  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    rollNumber: '', // Changed from rollNo to rollNumber
    ownerEmail: '',
    accessCode: '',
  });

  const toast = useToast(); // Define the toast variable

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can add your authentication logic
    const { companyName, ownerName, rollNumber, ownerEmail, accessCode } = formData; // Destructure the formData
    if (!companyName || !ownerName || !rollNumber || !ownerEmail || !accessCode) {
      toast({
        title: 'Please fill all entries',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }
    // For simplicity, we'll just display the submitted data
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('http://localhost:5000/auth', { ownerEmail, accessCode }, config);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      // Change the page to "search" page
      setPage('search');
    } catch (err) {
      toast({
        title: 'Error occurred',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      maxW="400px"
      mx="auto"
    >
      {page === 'login' && (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Your FormControl components */}
            <FormControl>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ownerName">Owner Name</FormLabel>
              <Input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="rollNumber">Roll Number</FormLabel>
              <Input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ownerEmail">Owner Email</FormLabel>
              <Input
                type="email"
                id="ownerEmail"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="accessCode">Access Code</FormLabel>
              <Input
                type="password"
                id="accessCode"
                name="accessCode"
                value={formData.accessCode}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            {/* End of your FormControl components */}
            <Button type="submit" colorScheme="blue">
              Login
            </Button>
          </VStack>
        </form>
      )}

      {page === 'search' && (
        <div>
          <h2>Welcome to the Search Page</h2>
          
        </div>
      )}
    </Box>
  );
}

export default LoginPage;
