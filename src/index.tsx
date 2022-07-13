import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

<link  type="text/css" media="screen" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600"/>;



const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      
        <App />
      
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

