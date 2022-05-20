import React, { useEffect } from 'react'
import { Button, Image, useColorModeValue, useToast, /*Menu, Box,
    MenuButton, MenuList, MenuItem*/
} from '@chakra-ui/react';
import { checkIfWalletIsConnected, connectWallet } from 'services/walletConnections';
import { useAuth } from 'contexts/AuthContext';
import BNBLogo from "assets/chain/bnb-logo.svg"
import ETHLogo from "assets/chain/eth-logo.svg"
import HECOLogo from "assets/chain/heco-logo.png"
import ArbitrumLogo from "assets/chain/arbitrum.png"
import AuroraLogo from "assets/chain/aurora.png"
import AvalancheLogo from "assets/chain/avalanche.png"
import FantomLogo from "assets/chain/fantom.png"
import HarmonyLogo from "assets/chain/harmony.png"
import MoonbeamLogo from "assets/chain/moonbeam.png"
import OptimismLogo from "assets/chain/optimism.png"
import PolygonLogo from "assets/chain/polygon.png"
import { network } from "../services/constants"

export default function LoginButton() {

  const bg = useColorModeValue("#E5E5E5", "gray.800");
  const toast = useToast();
  const id = 'toast'
  const { currentAccount, setCurrentAccount, currentNetwork } = useAuth();
  const handleLogin = async() => {
      if(!window.ethereum) {
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'No wallet found',
            description: "Please install Metamask",
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
        }
        return;
      }
      const _address = await connectWallet();
      setCurrentAccount(_address)
  }
  useEffect(() => {
    const getAccount = async() => {
        if(!window.ethereum) {
            if (!toast.isActive(id)) {
                toast({
                id,
                title: 'No wallet found',
                description: "Please install Metamask",
                status: 'error',
                duration: 4000,
                isClosable: true,
                })
            }
            } else {
            setCurrentAccount(await checkIfWalletIsConnected());
        }
    }
    getAccount()
    }, [setCurrentAccount, toast]);
  return (
          <>
          { currentAccount && currentNetwork ?
          <Button bg={bg} size="lg">
            <Image src={
              network[currentNetwork] != undefined ? (
              network[currentNetwork].network === 'Ropsten' || network[currentNetwork].network === 'Kovan' || network[currentNetwork].network === 'Ethereum' ? ETHLogo
              :
              network[currentNetwork].gasToken=== 'BNB' ? BNBLogo
              :
              network[currentNetwork].gasToken=== 'HT' ? HECOLogo
              :
              network[currentNetwork].network=== 'Arbitrum Rinkeby' || network[currentNetwork].network=== 'Arbitrum' ? ArbitrumLogo
              :
              network[currentNetwork].network=== 'Optimism' ? OptimismLogo
              :
              network[currentNetwork].network=== 'Polygon' ? PolygonLogo
              :
              network[currentNetwork].network=== 'Aurora' ? AuroraLogo
              :
              network[currentNetwork].network=== 'Fantom' ? FantomLogo
              :
              network[currentNetwork].network=== 'Moonbeam' ? MoonbeamLogo
              :
              network[currentNetwork].network=== 'Harmony' ? HarmonyLogo
              :
              network[currentNetwork].network=== 'Avalanche' ? AvalancheLogo
              : ETHLogo) : ETHLogo
            } h="15px" mr="2"/>
            {currentAccount.substring(0, 5)+"...."+currentAccount.substring(currentAccount.length-6)}
          </Button>
          /*
          <Box>
          <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {currentAccount.substring(0, 5)+"...."+currentAccount.substring(currentAccount.length-6)}
          </MenuButton>
          <MenuList >
            <MenuItem>Sample</MenuItem>
          </MenuList>
          </Menu>
          </Box> 
          */
            : 
            <Button 
              bg="brand.100" color="white" 
              size="md" onClick={handleLogin}
              _hover={{
                backgroundColor: "brand.200"
              }}
            >
              Connect Wallet
            </Button>
          }
          </>

  )
}
