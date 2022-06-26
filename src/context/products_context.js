import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url, single_product_url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  //10 
  isSidebarOpen:false,
  //38 -
  products_loading:false,
  products_error:false,
  products: [] ,
  featured_products:[],
  //end of 38 -go to fetch products for dispatch 
  //53- single product state values 
  single_product_loading:false,
  single_product_error:false,
  single_product: {},
  //end of 53 
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  //9-aslında sistemi app dede kurabilirdi ama bu sayfa ile sarmayı tercih etti appi şimdide reducer ile başladı  
  const [state,dispatch]=useReducer(reducer,initialState)
   
  //11 and then go to products reducer page 
  const openSidebar=()=>{
    dispatch({type: SIDEBAR_OPEN}) //TYPE OF ACTİON
  }
  // //13- 15 uncomment because it was showcase  ınvoking function with useeefect showcase  , ve tekrar reducera gidip state i return yapacaksın property valuesunu değiştirip orada 
  // useEffect(()=>{
  //   openSidebar()
  // },[]) 

  //end of 9 
  // 16- another sidebar but for closing 
  const closeSidebar=()=>{
    dispatch({type: SIDEBAR_CLOSE})
  }
  //END OF 16-- NOW PASS DOWN THE VALUES TO VALUE  BELOW with //17 
  //17- VALUE passing double curly javascript land and then set up object birçok değer olacak onları geçiyor state ile geç sonra open ve close sidebar bunlar işe yaradı mı diye kontrol et sonra sidebar bu değerleri almış mı diye  bak 
  

  // 37 - fetching   url ye alias verdi import ederken 
  
  const fetchProducts = async(url) => {
    //39- 
     dispatch({type:GET_PRODUCTS_BEGIN})
    // end of 39 - PRODUCTS reducera gidip bunu işler hale getireceksin ama 
    try {
      const response =await axios.get(url)
      const products=response.data
      //41
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:products})
      //end of 41- reducera git tekrar handle it 
    } catch (error) {
      //43- THEN GO HANDLE İT İN REDUCER 
      dispatch({ type: GET_PRODUCTS_ERROR });
      
    }
    // // console.log(response);

  }

  ///////////52 - fetch single product here birçok şey productstaki gibi aynı sadece aşağıdaki useeffectteki değil kendi sayfasında invoke edecek sanırım 
const fetchSingleProduct= async(url)=> {
  //54- actionlara bakmak önemli onları import ettik 
dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
try {
  const response= await axios.get(url);
  const singleProduct = response.data;
  dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload:singleProduct});
} catch (error) {
  dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
}
}
//end of 54 -next  go  to products reducer and take care of actions 
  //////////end of 52 
  useEffect(()=>{
    fetchProducts(url)
    //48- url kontrolu yapıyor error çalışıyor mu diye kod yazımı yok 
    // fetchProducts(`${url}s`)
    //end of 48 --featured productsa geri dön 
  },[])

//end of 37 - go to   initial state for functionality  

  return (
    //56 - pass fetch single product also 
    <ProductsContext.Provider value={{...state,openSidebar,closeSidebar,fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}

//product context is getting my products from api 