import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  //12
  if (action.type === SIDEBAR_OPEN) {
    //14 - sidebarı açıyorsun state return and new value
    // console.log(action);
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  //end of 12 products contexte geri gidip invoke function

  //40 -
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  //end of 40 -products contexte gidiyosun fetche
  //42 -update your arrays bir featured products bir de full products var featured true ise return my product implicit return yaptık, şimdi all productsı da yapalım - fetured products es6 ile tek seferde yazılabilir ben uzun yazdım
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products: featured_products,
    };
  }
  //44
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  //end of 44 - next step rendering the featured products
  // 55- single product için başlıyor
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }
  //end of 55--then next is about loading and error  single product page  but before it we should passthe function down in products context  fetch single productı  providera geçmemiz lazım 
  //end of 42  products -contexte gidip erroru de hallet
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
