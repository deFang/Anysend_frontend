import {
    Box, chakra, Container, Stack,
    Text, useColorModeValue, VisuallyHidden,
    Flex, Image, Divider
  } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaDiscord, FaTelegramPlane, FaGithub } from 'react-icons/fa';
import Logo from "assets/logo.png";
import React from "react";

  
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
            <chakra.h1 color='#7ba8f9' fontSize="xl" fontWeight="bold" ml="2">
                ANY<chakra.a color='#2561ed'>SEND</chakra.a>
            </chakra.h1>
          </chakra.a>
        </Flex>
        </Box>
        <Box align={'center'}>
          <Text>© 2022 AnySend. All rights reserved</Text>
        </Box>
        <Box align={'center'}>
          <Stack direction={'row'} spacing={6} justify={'right'}>
          <SocialButton label={'Twitter'} href={'https://twitter.com/anysend_pro'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/Anysender'}>
            <FaGithub />
          </SocialButton>
          {/*<SocialButton label={'Instagram'} href={'#'}>*/}
          {/*  <FaInstagram />*/}
          {/*</SocialButton>*/}
          <SocialButton label={'Discord'} href={'https://discord.gg/xmKww5zAXw'}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={'Telegram'} href={'https://t.me/anysend_pro'}>
            <FaTelegramPlane />
          </SocialButton>
        </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}