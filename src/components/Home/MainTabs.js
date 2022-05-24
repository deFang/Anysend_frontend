import React from 'react'
import Amounts from './FormTabs/Amounts';
import Addresses from './FormTabs/Addresses';
import Token from './FormTabs/Token';
import SupportedNetworks from './SupportedNetworks';
import FAQs from './FAQs';
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, useColorModeValue,
    Button, Switch, FormControl, FormLabel, Tooltip, Grid, GridItem, useToast
} from '@chakra-ui/react'
import {Container} from '@chakra-ui/react'
import {SimpleGrid} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";
import {InfoOutlineIcon} from '@chakra-ui/icons';
import {useAuth} from 'contexts/AuthContext';

import convertStringAddrToArr from 'utils/convertStringAddrToArr';
import convertStringAmountAddrToArr from 'utils/convertStringAmountAddrToArr';
import {network} from "../../services/constants";

export default function MainTabs() {

    const bg = useColorModeValue('light_background', 'dark_background');
    let navigate = useNavigate();
    const toast = useToast({
         position: 'top'
    })

    const {
        amount, setAmount, tokenAddress, setTokenAddress, addresses, setAddresses,
        currentAccount, isPro, setIsPro, tabIndex, setTabIndex,
        currentNetwork
    } = useAuth()

    const changePro = () => {
        setIsPro(!isPro)
        setTokenAddress("")
        setAddresses("")
    }

    const confirm = () => {
        if (!currentAccount) {
            toast({
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if (!isPro && !amount) {
            toast({
                title: 'No Amount detected',
                description: "Please add correct amount.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if (!isPro && amount <= 0) {
            toast({
                title: 'Incorrect Amount detected',
                description: "Amount can't be negative.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if (tabIndex === 1 && tokenAddress.length !== 42) {
            toast({
                title: 'Incorrect Token Address detected',
                description: "Please enter correct address",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if (!addresses || addresses.length === 0) {
            toast({
                title: 'Incorrect Addresses detected!',
                description: "Please enter correct addresses.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if (!isPro && typeof (addresses) === "string") {
            setAddresses(convertStringAddrToArr(addresses))
        }

        if (isPro && typeof (addresses) === "string") {
            setAddresses(convertStringAmountAddrToArr(addresses))
        }

        if (network[currentNetwork] == undefined) {
            toast({
                title: 'Unsupported Network detected!',
                description: "Please switch to supported network.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        navigate("/confirm", {replace: false})
    }

    const handleTabChange = index => {
        setTabIndex(index)
        setAmount("")
    }

    return (
        <>
            <Container maxW='100%' minH='calc(100vh - 160px)' bg={bg} centerContent>
            <Container centerContent m="16px">
                <Box mt="0" px="24px"  rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")}
                     w={{base: '80vw', lg: "768px"}} h="800px">
                    <Tabs isFitted variant='unstyled' onChange={(index) => handleTabChange(index)}>
                        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                            <GridItem colSpan={4}>
                                <TabList mx={4} mt="8" p={2} bg="brand.300" rounded="xl" w={{base: "92.5%", lg: "60%"}}
                                         color="black">
                                    <Tab _selected={{color: 'black', bg: 'brand.200'}}
                                         _focus={{outline: "none"}} rounded="lg">
                                        Send {network[currentNetwork] == undefined ? "ETH" : network[currentNetwork].gasToken}
                                    </Tab>
                                    <Tab _selected={{color: 'black', bg: 'brand.200'}}
                                         _focus={{outline: "none"}} rounded="lg">
                                        Send Tokens
                                    </Tab>
                                </TabList>
                            </GridItem>
                            <GridItem colSpan={1} display='flex' alignItems='center'>
                                <FormControl display='flex' alignItems='flex-end' justifyContent='flex-end' mt="8"
                                             pr="4">
                                    <FormLabel htmlFor='pro' mb='0'>
                                        PRO
                                        <Tooltip
                                            label='In Pro Mode, you can set different amounts for each address'
                                            fontSize='sm' rounded="md">
                                            <InfoOutlineIcon ml="2"/>
                                        </Tooltip>
                                    </FormLabel>
                                    <Switch id='pro' onChange={changePro}/>
                                </FormControl>
                            </GridItem>
                        </Grid>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={1} spacingY="16px">
                                    <Box>
                                    </Box>
                                    <Box>
                                        {isPro
                                            ? <></>
                                            : <Amounts/>}
                                    </Box>
                                    <Box>
                                        <Addresses/>
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <SimpleGrid columns={1} spacingY="16px">
                                    <Box>
                                        <Token/>
                                    </Box>
                                    <Box>
                                        {isPro
                                            ? <></>
                                            : <Amounts/>
                                        }
                                    </Box>
                                    <Box>
                                        <Addresses/>
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Box my='16px'>
                        <Center>
                            <Button bg="brand.100" color="white"
                                    size="lg"
                                    width='344px'
                                    height='58px'
                                    _hover={{
                                        backgroundColor: "brand.200"
                                    }}
                                    onClick={confirm}
                            >
                                NEXT
                            </Button>
                        </Center>
                    </Box>
                </Box>
                {/*</Center>*/}
            </Container>
            <SupportedNetworks/>
            <FAQs/>
            </Container>
        </>
    )
}
