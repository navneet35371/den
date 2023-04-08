import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeDYqXhTD96l7VwqBRi_uoWvBdSOe6FFE",
  authDomain: "trello-8be10.firebaseapp.com",
  projectId: "trello-8be10",
  storageBucket: "trello-8be10.appspot.com",
  messagingSenderId: "881503079235",
  appId: "1:881503079235:web:8f4028977aa1a4de5dbdf6",
  measurementId: "G-CZ0F2W4YFN"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);

export default firebaseapp;


root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CssBaseline />
    <App />
    </LocalizationProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    
  </ThemeProvider>,
);
