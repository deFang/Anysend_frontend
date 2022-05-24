import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, useColorModeValue, Container, Stack, chakra, Link
} from '@chakra-ui/react'


export default function FAQs() {
  return (
      <Box
        bg={useColorModeValue('light_background', 'dark_background')}
        pb="8"
        pt="8">
        <Container
            as={Stack}
            maxW={'full'}
            py={{base: "20", sm: "0"}}
            spacing={4}
            justify={'center'}
            align={'center'}>
            <chakra.p
                fontSize="xl"
                lineHeight="8"
                fontWeight="extrabold"
                letterSpacing="tight"
            > FAQs </chakra.p>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box textAlign='left' fontWeight={"bold"}  w="748px">
                What is AnySend?
              </Box>
              <AccordionIcon/>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="748px">
            Anysend does one thing: Send ether and ethereum tokens to multiple addresses with a single transaction. Simply type in addresses or upload csv files to start.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontWeight={"bold"}  w="748px">
                Is it free?
              </Box>
              <AccordionIcon/>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Anysend is compeletly FREE!
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontWeight={"bold"}  w="748px" maxW="748px">
                Can I send different amount of token to each address?
              </Box>
              <AccordionIcon/>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Try pro mode.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontWeight={"bold"}  w="748px" maxW="748px">
                Anysend contract address?
              </Box>
              <AccordionIcon/>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="748px" maxW="748px">
            The anysend contract address is
            <Link href="https://etherscan.io/address/0xac762e706cf670c6d7576b24ca240912ec3dee9d" isExternal>
                <a> 0xAC762e706Cf670c6d7576B24Ca240912EC3dEE9D </a>
            </Link> on every chain. Check github to see code.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontWeight={"bold"}  w="748px" maxW="748px">
                Can I try it on testnet?
              </Box>
              <AccordionIcon/>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} w="748px" maxW="748px">
            Anysend is also deployed on BSC testnet/ Arbitrum Rinkeby testnet/ Kovan testnet / Ropsten testnet.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
          </Container>
        </Box>
  )
}