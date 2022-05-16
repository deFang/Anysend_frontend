import React, {useCallback} from 'react'
import {
    FormControl, FormLabel, Input, Badge, InputRightAddon, InputGroup
} from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { network } from "../../../services/constants";
import {ethers} from "ethers";
import erc20_abi from "../../../abi/erc20_abi.json";
import {formatFixed} from "@ethersproject/bignumber";

export default function Token() {

  const { currentAccount, currentNetwork,
      setTokenAddress, setTokenName, setTokenBalance, setTokenDecimal } = useAuth();

    const getBalance = async(tokenAddress) => {
        if(!currentAccount) return;
        try {
          const { ethereum } = window; //injected by metamask
          //connect to an ethereum node
          const provider = new ethers.providers.Web3Provider(ethereum);
          //gets the account
          const signer = provider.getSigner();
          console.log('tokenAddress', tokenAddress)
          if (tokenAddress) {
             const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
             const user = await signer.getAddress()
             setTokenName(await tokenContract.symbol())
             const decimal = await tokenContract.decimals()
             setTokenDecimal(decimal)
             const balance =  await tokenContract.balanceOf(user)
             setTokenBalance(formatFixed(balance, decimal))
          }
        } catch(err) {
          console.log(err)
        }
      }

  const handleChange = (e) => {
    setTokenAddress(e.target.value)
      getBalance(e.target.value)
  }

  return (
    <>
    <FormControl>
        <FormLabel htmlFor='token'>
          Token
          <Badge colorScheme="blue" ml="2" rounded="md" p="1">Contract (
            {
              network[currentNetwork] == undefined ? 'Ethereum' : network[currentNetwork].network
            }
            )
          </Badge>
        </FormLabel>
        <InputGroup>
        <Input id='token' _placeholder={{color: "gray.500"}} onChange={handleChange}  color="black"
        type='email' w='100%' h='60px' backgroundColor="#E5E5E5" placeholder='0xA0c68C638235ee32657e8f720a23ceC1bFc77C77'/>
        </InputGroup>
    </FormControl>
    </>
  )
}
