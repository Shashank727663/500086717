import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

function LoginPage() {
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
    // For simplicity, we'll jst display the submitted data
    try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("http://localhost:5000/api/user/login", {  email, password }, config);
        toast({
          title: 'Registration successful',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/search");
      } catch (err) {
        toast({
          title: 'Error occurred',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
  
    console.log('Submitted Data:', formData);
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
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
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
            <FormLabel htmlFor="rollNumber">Roll Number</FormLabel> {/* Updated id and name to rollNumber */}
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

          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default LoginPage;
