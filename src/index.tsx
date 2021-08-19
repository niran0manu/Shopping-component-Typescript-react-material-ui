import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {QueryClient, QueryClientProvider} from 'react-query';

import App from './App';


const client = new QueryClient();

ReactDOM.render(
  
    <QueryClientProvider client ={client}>
        <App />
    </QueryClientProvider>
    
  
 , document.getElementById('root')
);

