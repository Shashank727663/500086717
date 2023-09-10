import React, { useState } from "react";
import { VStack, FormControl } from "@chakra-ui/react";
import { FormLabel, InputGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow(!show);
  };

  const submithandler = async () => {
    setLoading(true);

    if (!companyName || !ownerName || !rollNo || !ownerEmail || !accessCode) {
      toast({
        title: 'Please fill all entries',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("http://localhost:5000/register", { companyName, ownerName, rollNo, ownerEmail, accessCode }, config);
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
  };

  return (
    <VStack spacing="5px">
      <FormControl id="companyName" isRequired>
        <FormLabel>Company Name:</FormLabel>
        <Input
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </FormControl>
      <FormControl id="ownerName" isRequired>
        <FormLabel>Owner Name:</FormLabel>
        <Input
          placeholder="Enter Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </FormControl>
      <FormControl id="rollNo" isRequired>
        <FormLabel>Roll Number:</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="ownerEmail" isRequired>
        <FormLabel>Owner Email:</FormLabel>
        <Input
          placeholder="Enter Owner Email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="accessCode" isRequired>
        <FormLabel>Access Code:</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button color="blue" width="100%" type='submit' onClick={submithandler} isLoading={loading}>
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;
