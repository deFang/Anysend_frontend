import {
    Box, chakra, Container, Stack,
    Text, useColorModeValue, VisuallyHidden,
    Flex, Image, Divider
  } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import Logo from "assets/logo.png";

  
const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
  
export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('light_background', 'dark_background')}
      color={useColorModeValue('gray.700', 'gray.200')}
      minH="80px"
      >
      <Divider />
      <SimpleGrid columns={3} spacing={10} py='16px' px='16px'>
        <Box >
          <Flex justify={'left'}>
          <chakra.a
            href="/"
            title="Navbar"
            display="flex"
            alignItems="center"
          >
            <Image src={Logo} h="30px"/>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              One Click
            </chakra.h1>
          </chakra.a>
        </Flex>
        </Box>
        <Box align={'center'}>
          <Text>© 2022 One Click. All rights reserved</Text>
        </Box>
        <Box align={'center'}>
          <Stack direction={'row'} spacing={6} justify={'right'}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'Discord'} href={'#'}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={'Telegram'} href={'#'}>
            <FaTelegramPlane />
          </SocialButton>
        </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}