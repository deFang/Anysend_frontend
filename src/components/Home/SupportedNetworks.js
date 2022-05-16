import {
    Box, Container, Link, Stack, useColorModeValue, chakra, Image
} from '@chakra-ui/react';
import BNBLogo from "assets/bnb-logo.svg"
import HECOLogo from "assets/heco-logo.png"

export default function SupportedNetworks() {
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
            >
                Supported Networks
            </chakra.p>
            <Stack direction={'row'} spacing={8}>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={BNBLogo}/>
            </Link>
            <Link href="https://www.hecochain.com/en-us/" isExternal>
                <Image mt="4" h="40px" src={HECOLogo}/>
            </Link>
            </Stack>
        </Container>
        </Box>
    );
}