import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios"
import { ChakraProvider,extendTheme } from '@chakra-ui/react'

// "https://falta-uno-1.herokuapp.com"
// axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const theme=extendTheme({
  styles:{
    global:{
      body:{
        backgroundColor:"#0C131F",
        overflowY: "scroll",
        position:"relative",
      },
      colors: {
        success: {
          100: '#fafafa',
          200: '#f7f7f7',
        },
      }
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
           domain="leogonzalez.us.auth0.com"
           clientId="X7uVDaWOv99Br5K2eNE05D3MlRNYioWR"
           redirectUri={window.location.origin}
           advancedOptions={{
             defaultScope: 'openid profile email'
          }}
          scope='user_metadata app_metadata slack_id'
          > 
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
