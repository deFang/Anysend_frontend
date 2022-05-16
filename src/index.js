import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/AuthContext';

const breakpoints = {
  sm: '720px',
  md: '960px',
  lg: '1240px'
}

const theme = extendTheme({
  breakpoints,
  colors: {
    brand: {
      100: "#2561ED",
      200: "#7BA8F9",
      300: "#D3E5FE"
    },
    light_background: "#E5E5E5",
    dark_background: "#1A202D"
  },
  config: {
    initialColorMode: 'dark',
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
