import React, { useState, useEffect, useCallback } from 'react'
import AddressesList from './Confirm/AddressesList';
import {
    Center, Box, useColorModeValue,
    Button, Table, Thead, SimpleGrid,
    Tr, Th, Heading, TableCaption, VStack,
    useToast, chakra, Link, Container
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';
import { ethers } from 'ethers';
import multisend_abi from "abi/multisendv2_abi.json"
import erc20_abi from "abi/erc20_abi.json"
import DonationBox from './Confirm/DonationBox';
import ApproveSend from './Confirm/ApproveSend';
import Amounts from "./FormTabs/Amounts";
import Addresses from "./FormTabs/Addresses";
import {network} from "../../services/constants";
import {parseFixed} from "@ethersproject/bignumber";

export default function Confirm() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    const MAX = ethers.BigNumber.from('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
    let navigate = useNavigate();
    const toast = useToast({
         position: 'top'
    })
    const toastID = 'toast'

    const [ isLoading, setIsLoading ] = useState()
    const [ isApproved, setIsApproved ] = useState(false)
    const [ isAllowed, setIsAllowed] = useState(true)
    const [ tokenSymbol, setTokenSymbol ] = useState()
    const [ contractGas, setContractGas ] = useState()
    const [ avgGas, setAvgGas ] = useState()
    const [ isSent, setIsSent ] = useState(false)

    const { currentAccount, addresses, tokenAddress, amount, isPro, setIsPro, 
        setAmount, setTokenAddress, setAddresses, contractAddr, currentNetwork,
        setContractAddr, setTabIndex, tabIndex, isChecked, tokenDecimal
    } = useAuth()



    const getTransactionReceipt = async (tx) => {
        try{
            await tx.wait()
            console.log('tx', tx)
            toast({
                toastID,
                title: 'Transaction Executed',
                description: "The transaction is successfully executed",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(error) {
            console.log('err', error)
            toast({
                toastID,
                title: 'Transaction Failed',
                description: error.message || error.stack,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const getApproveReceipt = async (tx) => {
        try{
            await tx.wait()
            console.log('tx', tx)
            setIsApproved(true)
            toast({
                toastID,
                title: 'Approve Executed',
                description: "The transaction is successfully executed",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(error) {
            console.log('err', error)
            toast({
                toastID,
                title: 'Transaction Failed',
                description: error.message || error.stack,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }


    const getTokenSymbol = useCallback(async() => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
            setTokenSymbol(await tokenContract.symbol());
        } catch(err) {
            console.log(err)
        }
    }, [tokenAddress])



    const getAllowance = useCallback(async () => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
            const user = await signer.getAddress()
            const allowance = await tokenContract.allowance(user, contractAddr)
            console.log("allowance", allowance)
            if ( allowance == 0 ) {
                setIsAllowed(false)
            }
        } catch(err) {
            console.log(err)
        }
    }, [tokenAddress, addresses, contractAddr])

    const getContractGasPrice = useCallback(async() => {
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            let _currentPrice;
            provider.getGasPrice().then((currentPrice)=> {
                _currentPrice = currentPrice
            })
            const multisend_contract = new ethers.Contract(contractAddr, multisend_abi , signer);
            let estimation;
            if(isPro) {
                if(tabIndex===1) {
                    let _amountArr = []
                    let _addressArr = []
                    for(let i=0; i<addresses.length; i++) {
                        _amountArr.push(parseFixed(addresses[i][1], tokenDecimal))
                        // _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                        _addressArr.push(addresses[i][0])
                    }
                    try {
                        console.log('pro tab=1', tokenAddress, _addressArr, _amountArr, isChecked)
                        estimation = await multisend_contract.estimateGas.sendDifferentValue(tokenAddress, _addressArr, _amountArr, isChecked)
                        console.log('est', estimation)
                    } catch(err) {
                        console.log(err)
                    }
                } else {
                    const options = {value: ethers.utils.parseEther((amount).toString())}
                    let _amountArr = []
                    let _addressArr = []
                    for(let i=0; i<addresses.length; i++) {
                        _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                        _addressArr.push(addresses[i][0])
                    }
                    estimation = await multisend_contract.estimateGas.ethSendDifferentValue(_addressArr, _amountArr, isChecked, options)
                }
            } else {
                if(tabIndex===1) {
                    try {
                        estimation = await multisend_contract.estimateGas.sendSameValue(tokenAddress, addresses, parseFixed(amount, tokenDecimal), isChecked)
                    } catch(err) {
                        console.log(err)
                    }
                } else {
                    const options = {value: ethers.utils.parseEther((amount*addresses.length).toString())}
                    estimation = await multisend_contract.estimateGas.ethSendSameValue(addresses, ethers.utils.parseEther((amount).toString()), isChecked, options)
                }
            }
            setContractGas(ethers.utils.formatEther(estimation * _currentPrice))
            setAvgGas(ethers.utils.formatEther(parseInt(estimation * _currentPrice / addresses.length)))
        } catch(err) {
            console.log(err)
            // setContractGas("-")
            // setAvgGas("-")
        }
    }, [addresses, amount, contractAddr, tokenAddress, isPro, tabIndex, isApproved, isAllowed])

    useEffect(() => {
        setContractAddr(network[currentNetwork].contract)
        if(tokenAddress) {
            getTokenSymbol()
            getAllowance()
        }
        getContractGasPrice()
    }, [currentNetwork, setContractAddr, getTokenSymbol, tokenAddress, 
        getContractGasPrice, tabIndex])



    const handleBackClick = () => {
        setIsPro(false)
        setAddresses()
        setAmount()
        setTokenAddress()
        setTabIndex(0)
        navigate("/", { replace: false })
    }

    const sendTx = async() => {
        if(!currentAccount) {
            toast({
                toastID,
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(network[currentNetwork] == undefined) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        setIsLoading(true)
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const multisendContract = new ethers.Contract(contractAddr, multisend_abi, signer);
            if(isPro) {
                const options = {value: ethers.utils.parseEther((amount).toString())}
                let _amountArr = []
                let _addressArr = []
                for(let i=0; i<addresses.length; i++) {
                    _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                    _addressArr.push(addresses[i][0])
                }
                getTransactionReceipt(await multisendContract.ethSendDifferentValue(_addressArr, _amountArr, isChecked, options))
            } else {
                const options = {value: ethers.utils.parseEther((amount*addresses.length).toString())}
                getTransactionReceipt(await multisendContract.ethSendSameValue(addresses, ethers.utils.parseEther((amount).toString()), isChecked, options))
                // await multisendContract.ethSendSameValue(addresses, ethers.utils.parseEther((amount).toString()), isChecked, options);
            }
            setTimeout(() => {
                setIsSent(true)
            }, 5000);
            toast({
                toastID,
                title: 'Transaction Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
            toast({
                toastID,
                title: 'Error',
                description: err.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
        }
    }

    const sendTokenTx = async() => {
        setIsLoading(true)
        if(!currentAccount) {
            toast({
                toastID,
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(network[currentNetwork] == undefined) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const multisendContract = new ethers.Contract(contractAddr, multisend_abi, signer);


            if(isPro) {
                let _amountArr = []
                let _addressArr = []
                for(let i=0; i<addresses.length; i++) {
                    _amountArr.push(ethers.utils.parseEther(addresses[i][1]))
                    _addressArr.push(addresses[i][0])
                }
                if (isChecked) {
                    const options = {value: ethers.utils.parseEther(network[currentNetwork].donationAmount)}
                    getTransactionReceipt(await multisendContract.sendDifferentValue(tokenAddress, _addressArr, _amountArr, isChecked, options))
                } else {
                    getTransactionReceipt(await multisendContract.sendDifferentValue(tokenAddress, _addressArr, _amountArr, isChecked))
                }
            } else {
                if (isChecked) {
                    const options = {value: ethers.utils.parseEther(network[currentNetwork].donationAmount)}
                    getTransactionReceipt(await multisendContract.sendSameValue(tokenAddress, addresses, ethers.utils.parseEther((amount).toString()), isChecked, options))
                } else {
                    getTransactionReceipt(await multisendContract.sendSameValue(tokenAddress, addresses, ethers.utils.parseEther((amount).toString()), isChecked))
                }
            }
            setTimeout(() => {
                setIsSent(true)
            }, 5000);
            toast({
                toastID,
                title: 'Transaction Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
            toast({
                toastID,
                title: 'Error',
                description: err.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);

        }
    }

    const approveTx = async() => {
        setIsLoading(true)
        if(!currentAccount) {
            toast({
                toastID,
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(network[currentNetwork] == undefined) {
            toast({
                toastID,
                title: 'Incorrect Network detected!',
                description: "Please switch to supported networks.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(!amount) {
            toast({
                toastID,
                title: 'No amount detected',
                description: "Please input correct values",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            //connects with the contract
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
            const _amount = ethers.utils.parseEther((((addresses.length*10*amount)/10).toString()))
            getApproveReceipt(await tokenContract.approve(contractAddr, MAX))
            toast({
                toastID,
                title: 'Approval Request Submitted',
                description: "Please check explorer.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err) {
            console.log(err)
            toast({
                toastID,
                title: 'Error',
                description: err.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 5000);
        }
    }
    return (
        <Container maxWidth='100%' minH='calc(100vh - 160px)' bg={bg} centerContent>
        <Box mt="0" px="24px"  rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")}
                     w={{base: '80vw', lg: "768px"}} h="800px">
            <Button variant="ghost"  m="1" leftIcon={<ArrowBackIcon />} onClick={handleBackClick}>
                Back
            </Button>
            <SimpleGrid columns={1} spacingY="16px">
                <Box>
                    <Heading as="h2" size="md" my="2" align='center' color={useColorModeValue("gray.600", "gray.400")}>DETAILS</Heading>
                <Box overflowY="auto" maxHeight="224px">
                    <Table variant='simple' size="sm">

                <Thead position="sticky" top={0} bg="gray.500">
                    <Tr>
                    <Th>Address</Th>
                    <Th isNumeric>Amount</Th>
                    </Tr>
                </Thead>
                <AddressesList />
            </Table>
                </Box>
                    </Box>
                <Box>
                    <Center mt="4">
                    <VStack spacing="4">
                    <Heading as="h2" size="md" my="2" color={useColorModeValue("gray.600", "gray.400")}>SUMMARY</Heading>
                    {tokenAddress ?
                    <>
                    {/*<Heading as="h2" size="sm" my="2">*/}
                    {/*    Token Contract Address:*/}
                    {/*</Heading>*/}
                    {/*<chakra.h2>*/}
                    {/*    <Link href={"https://testnet.bscscan.com/address/"+tokenAddress} isExternal>*/}
                    {/*    {tokenAddress.substring(0, 5)+"..."+tokenAddress.substring(36, 42)}*/}
                    {/*    </Link>*/}
                    {/*    <ExternalLinkIcon ml="1"/>*/}
                    {/*</chakra.h2>*/}
                    </>
                    :
                    <></>
                    }

                    <SimpleGrid columns={[1, null, 2]} spacing={4}>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            Total Number Of Addresses
                            <Center>{addresses ? addresses.length : ""}</Center>
                        </Box>
                        <Box rounded="xl" bg='brand.200' height='80px' p="4">
                            <Center>
                            Total Amount to be Sent
                            </Center>
                            <Center>{isPro
                                ? tokenAddress ? amount + " " + tokenSymbol :  amount
                                : addresses
                                ? tokenAddress ? (addresses.length*10*amount)/10 + " " + tokenSymbol : (addresses.length*10*amount)/10
                                : ""}
                            </Center>
                        </Box>
                        {tabIndex === 1 ?
                        <>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Est. Total Transaction Cost
                                </Center>
                                <Center>
                                    {contractGas ? contractGas + ' ' + network[currentNetwork].gasToken : "need approve"}
                                </Center>
                            </Box>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Avg. Cost Per Address
                                </Center>
                                <Center>
                                    {avgGas ? avgGas + ' ' + network[currentNetwork].gasToken : "need approve"}
                                </Center>
                            </Box>
                        </>
                        :
                        <>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Est. Total Transaction Cost
                                </Center>
                                <Center>
                                    {contractGas ? contractGas + ' ' + network[currentNetwork].gasToken : "need approve"}
                                </Center>
                            </Box>
                            <Box rounded="xl" bg='brand.200' height='80px' p="4">
                                <Center>
                                Avg. Cost Per Address
                                </Center>
                                <Center>
                                    {avgGas ? avgGas + ' ' + network[currentNetwork].gasToken : "need approve"}
                                </Center>
                            </Box>
                        </>
                        }
                    </SimpleGrid>

                </VStack>
            </Center>
                </Box>
                <Box display="flex" justifyContent={'center'} py="16px">
                    <DonationBox />
                </Box>
                <Box align={'center'}>
                    {tokenAddress ? isAllowed ?
                    <Button bg="brand.100" color="white"
                    size="lg"
                    width="344px"
                    height="58px"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={sendTokenTx}
                    isLoading={isLoading}
                    >
                        SEND
                    </Button>
                    : (isApproved === false ?
                        <Button bg="brand.100" color="white"
                        size="lg"
                        width="344px"
                        height="58px"
                        _hover={{
                            backgroundColor: "brand.200"
                        }}
                        onClick={approveTx}
                        isLoading={isLoading}
                        >
                            APPROVE
                        </Button>
                        :
                        <Button bg="brand.100" color="white"
                        size="lg"
                        width="344px"
                        height="58px"
                        _hover={{
                            backgroundColor: "brand.200"
                        }}
                        onClick={sendTokenTx}
                        isLoading={isLoading}
                        >
                            SEND
                        </Button>)
                    :
                    <Button bg="brand.100" color="white"
                    size="lg"
                    width="344px"
                    height="58px"
                    _hover={{
                        backgroundColor: "brand.200"
                    }}
                    onClick={sendTx}
                    isLoading={isLoading}
                    isDisabled={isSent}
                    >
                        SEND
                    </Button>
                    }
                    {tabIndex === 1 && isAllowed === false ?
                    <ApproveSend isApproved={isApproved} isSent={isSent}/>
                    :
                    <></>}
                </Box>
            </SimpleGrid>
        </Box>
        </Container>
  )
}
