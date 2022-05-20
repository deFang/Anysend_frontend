import {
    Box, Container, Link, Stack, useColorModeValue, chakra, Image
} from '@chakra-ui/react';
import ETHLogo from "assets/chain/eth-logo.svg"
import BNBLogo from "assets/chain/bnb-logo.svg"
import HECOLogo from "assets/chain/heco-logo.png"
import ArbitrumLogo from "assets/chain/arbitrum.png"
import AuroraLogo from "assets/chain/aurora.png"
import AvalancheLogo from "assets/chain/avalanche.png"
import FantomLogo from "assets/chain/fantom.png"
import HarmonyLogo from "assets/chain/harmony.png"
import MoonbeamLogo from "assets/chain/moonbeam.png"
import OptimismLogo from "assets/chain/optimism.png"
import PolygonLogo from "assets/chain/polygon.png"


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
                <Image mt="4" h="40px" src={ETHLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={ArbitrumLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={OptimismLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={BNBLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={AvalancheLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={PolygonLogo}/>
            </Link>
            <Link href="https://www.binance.com/en" isExternal>
                <Image mt="4" h="40px" src={AuroraLogo}/>
            </Link>
            <Link href="https://www.hecochain.com/en-us/" isExternal>
                <Image mt="4" h="40px" src={HECOLogo}/>
            </Link>
            <Link href="https://www.hecochain.com/en-us/" isExternal>
                <Image mt="4" h="40px" src={MoonbeamLogo}/>
            </Link>
            <Link href="https://www.hecochain.com/en-us/" isExternal>
                <Image mt="4" h="40px" src={FantomLogo}/>
            </Link>
            <Link href="https://www.hecochain.com/en-us/" isExternal>
                <Image mt="4" h="40px" src={HarmonyLogo}/>
            </Link>
            </Stack>
        </Container>
        </Box>
    );
}