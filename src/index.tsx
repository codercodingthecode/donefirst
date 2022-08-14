import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import theme from './Theme';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import { awsConfig } from './Configuration/AmplifyConfig';
import { initializeApp } from 'firebase/app';
import { firebaseBucketConfig } from './Configuration/BucketConfig';

const firebaseConfig = { ...firebaseBucketConfig };

Amplify.configure(awsConfig);
export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
