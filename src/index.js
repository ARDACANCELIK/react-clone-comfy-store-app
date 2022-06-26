import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
//142
//dev--x94297w.us.auth0.com  domain
//iBZThKQ3lwaDwWywDJjQkhJ0vk6WTrmW  client id
//end of 142
////////////////
//143 ise tüm providerlarinı auth provider ile wrap yapıyorsun
//bu kodla

  /* <Auth0Provider
    domain="YOUR_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    redirectUri={window.location.origin}
  ></Auth0Provider> */
//end of 143 - user provider wrapi de var onu da  unutma  products providera kadar olan kısmı user provider ile sar 
 
///////////

//8 -ProductsProvider ile wrap yapıyor appi
ReactDOM.render(
  <Auth0Provider
    domain="dev--x94297w.us.auth0.com"
    clientId="iBZThKQ3lwaDwWywDJjQkhJ0vk6WTrmW"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        {/* //67  */}
        <FilterProvider>
          {/* //120 cart provider  */}
          <CartProvider>
            <App />
          </CartProvider>
          {/* end of  //120 cart provider- then go to cart context for set up   */}
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
    {/* //144 UserProvider wrap - //user context te git ve wrap it  */}
  </Auth0Provider>,
  document.getElementById("root")
);
