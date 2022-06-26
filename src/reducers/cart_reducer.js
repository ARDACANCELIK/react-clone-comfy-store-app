import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  //124 handle add to cart action- new item
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      //existing item in the cart - o zaman sayıyı artırıyoruz
      const tempCart = state.cart.map((cartItem) => {
        //check where the item is
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          //overwrite the amount
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem; //id eşleşmezse bir şey yapmıyoruz
        }
      });
      return { ...state, cart: tempCart }; // at the end  we set the cart equal to tempcart
    } else {
      //eğer item kart içinde değilse yeni item yaratıyoruz
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      //in the state i want to  overwrite the cart, copy all the previous values from the  cart zaten empty içine new item ekle
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  //end of 124 - cart page yapmaya gidiyoruz ama önce  cart contexte bazı noktaları düzelt
  // return state

  //134
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  //end of 134 -toggle amount a halledelim(artı eksi of numbers - go to cart context )

  //137 -id zaten  id+color
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } 
      else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }

  //END OF 137 - cart buttonsa git cart totals için 

  //141 - 
  if(action.type===COUNT_CART_TOTALS) {
      const {total_items,total_amount}=state.cart.reduce((total,cartItem)=>{
          const {amount,price} =cartItem 
          
          total.total_items += amount;
          total.total_amount += price * amount
        return total
      },{
        total_items:0,total_amount:0
      })

      return {...state,total_items,total_amount}
  }
  //END OF 141 - -  index js e git auth0 şifreleri al
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;


