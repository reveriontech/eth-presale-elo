import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers';
// import express from "express";
// import Moralis from "moralis";
// import cors from "cors";
// import dotenv from "dotenv";

// const app = express();
// const port = 5001;
// dotenv.config();

// app.use(cors());
// app.use(express.json());

// const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

// app.get("/getwalletbalance", async (req, res) => {
//   try {
//     const { query } = req;
//     const response = await Moralis.EvmApi.balance.getNativeBalance({
//       chain: "0xaa36a7",
//       address: query.address,
//     });

//     return res.status(200).json(response);
//   } catch (e) {
//     console.log(`Somthing went wrong ${e}`);
//     return res.status(400).json();
//   }
// });

// Moralis.start({
//   apiKey: MORALIS_API_KEY,
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening for API Calls`);
//   });
// });

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      //main: '#1a90ff',
      main: '#1cac1d',
    },
    neutral: {
      main: '#f8f9f9',
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          fontWeight: 600,
          textTransform: 'inherit'
        },
        contained: {
          fontWeight: 700,
          textTransform: 'inherit',
          borderRadius: 25
        },
      }
    }
  },
});

const POLLING_INTERVAL = 12000

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

// const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
// const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const APP_ID = "DYFU90AwvC6Ktjxrr31VdJNhAV5UadWBr97duwex";

const SERVER_URL = "https://gq7x7ofh7pyg.usemoralis.com:2053/server";

const Application = () => {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisDappProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
          </MoralisDappProvider>
      </Web3ReactProvider>  
    </MoralisProvider>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById("root")
);
