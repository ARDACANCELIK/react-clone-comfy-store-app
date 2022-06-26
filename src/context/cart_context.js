import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//127- cart storage tutucu 
const getLocalStorage=()=> {
  let cart= localStorage.getItem("cart");
  if(cart){
    return JSON.parse(localStorage.getItem("cart"))
  }
  else{
    return []
  }
}
//end of 127 

//118--
const initialState = {
  // cart: [], //128 bunu sildi initialize the state 
  cart:getLocalStorage() ,//128 böylece sayfayı yenilesek bile see ///end of 128 the cart contenti görüyoruz. ardından cart content jse git component olan cart content js 
  total_items: 0,
  total_amount: 0,
  shipping_fee: 543, //cent cinsinden
};
//end of 118
const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  //119-state,dispatch sonrası value'yu geç ayrıca {{javascriptland ve ob ject ile statei geçiyorusn }}  we should also wrap our application  go to index.js
  const [state, dispatch] = useReducer(reducer, initialState);

  //121 - add to cart fucntion  ayrıca aşağıdaki value state yanına geçiyor addtoCart'ı   es6 yazılışı payload içinde id:id değil yani bu sefer

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  //end of 121 - go to single addtocart js get your function and pass these values down
  //125- ekleme  //133 tekrar buradayız fonksiyon için önceden placeholderdı doldurmaya geldik REMOVE İTEM VE CLEARCart içine dispatchleri yazdık şimdi cart reducera git 
  //remove item
  const removeItem = (id) => {
    dispatch({type:REMOVE_CART_ITEM,payload:id})
  };
  //toggle Amount -135- daha sonra cart item js e git 
  const toggleAmount = (id, value) => {
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT,payload:{id,value}})
  };
  //clear  cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART});
  }; 
//local storage 
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.cart));
    //140 -çünkü zaten cart ile işlemi burada yapıyor disopatch i burada yapabilirim 
    dispatch({ type: COUNT_CART_TOTALS });
    //end of 140 tthen go to reducer
  },[state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
//125 end of -cart page a git 
//end of 119
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
