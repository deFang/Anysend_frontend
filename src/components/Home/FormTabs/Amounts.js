import React, { useState, useEffect, useCallback } from 'react'
import {
    FormControl, FormLabel, FormHelperText, InputGroup,
    Input, InputRightAddon
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useAuth } from 'contexts/AuthContext'

export default function Amounts() {

  const [ balance, setBalance ] = useState();
  const { currentAccount } = useAuth();
  const getBalance = useCallback(async() => {
    if(!currentAccount) return;
    try {
      const { ethereum } = window; //injected by metamask
      //connect to an ethereum node
      const provider = new ethers.providers.Web3Provider(ethereum); 
      //gets the account
      const signer = provider.getSigner(); 
      setBalance(ethers.utils.formatEther(await signer.getBalance("latest")));
    } catch(err) {
      console.log(err)
    }
  }, [currentAccount])

  useEffect(() => {
    let isConnected = false;
    if(!isConnected) {
      getBalance()
    }
    return () => {
      isConnected = true;
    }
  }, [getBalance])
  return (
    <>
    <FormControl mt="4">
        <FormLabel htmlFor='amount'>Amount per Address</FormLabel>
        <InputGroup>
          <Input id='amount' _placeholder={{color: "gray.500"}} 
          type='email' w={{base:'100%', md:"60%"}} backgroundColor="#E5E5E5" placeholder='10'/>
          <InputRightAddon children="BNB" />
        </InputGroup>
        <FormHelperText>Wallet Balance: {balance ? balance : "0"} BNB</FormHelperText>
    </FormControl>
    </>
  )
}
