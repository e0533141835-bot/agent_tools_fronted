import React from 'react';
import ReactDOM from 'react-dom/client';
// הוספנו פה את הייבוא של defaultSystem:
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* הוספנו את המאפיין value עם העיצוב הבסיסי של המערכת */}
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);