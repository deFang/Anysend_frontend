import React, { useEffect, useCallback } from 'react'
import {
    FormControl, FormLabel, FormHelperText, InputGroup,
    Input, InputRightAddon
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useAuth } from 'contexts/AuthContext'
import {network} from "../../../services/constants";
import erc20_abi from "../../../abi/erc20_abi.json";


export default function Amounts() {

  const { currentAccount, setAmount, balance, 
    setBalance, tabIndex, currentNetwork,
    tokenAddress, tokenName, tokenBalance
   } = useAuth();

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
  }, [currentAccount, setBalance])

  const handleChange = async (e) => {
    setAmount(e.target.value)
  }



  useEffect(async () => {
    let isConnected = false;
    if(!isConnected) {
      await getBalance()
    }
    return () => {
      isConnected = true;
    }
  }, [getBalance, tokenAddress])

  return (
    <>
    <FormControl mt="4" mb="4">
        <FormLabel htmlFor='amount'>Amount per Address</FormLabel>
        <InputGroup>
          <Input id='amount' _placeholder={{color: "gray.500"}} onChange={handleChange}
          type='number' color="black" w={{base:'100%', lg:"288px"}} h='60px' backgroundColor="#E5E5E5" placeholder='1.0' isRequired/>
          {tabIndex === 0 ?
          <InputRightAddon h='60px' children={network[currentNetwork] == undefined ? "ETH" : network[currentNetwork].gasToken} />
          :
          <InputRightAddon h='60px' children={tokenName} />
          }
        </InputGroup>
        {tabIndex===0 ?
          <FormHelperText mt='8px' mb='8px'>Wallet Balance: { balance ? balance : "0"} {network[currentNetwork] == undefined ? "ETH" : network[currentNetwork].gasToken}
          </FormHelperText>
          : 
          <FormHelperText mt='8px' mb='8px'>Wallet Balance: { tokenBalance ? tokenBalance : "0"} {tokenName}
          </FormHelperText>
        }
    </FormControl>
    </>
  )
}
