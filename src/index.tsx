import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './Main';

(() => {
  const root = document.querySelector('#root');
  if (root) {
    ReactDOM.createRoot(root).render((
      <React.StrictMode>
        <ChakraProvider>
          <Main />
        </ChakraProvider>
      </React.StrictMode>
    ));
  }
})();
