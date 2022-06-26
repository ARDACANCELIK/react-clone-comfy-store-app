import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  //70
  if (action.type === LOAD_PRODUCTS) {
    //  action tipi load products ise  then change my state value
    //94-
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice); //on yedi tane array var

    //end of 94
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      //95
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }, //değerler kaybolmasın diye
      //end of 95- ardından tek tek filtre displayleri yazı,marka,fiyat geliyor şimdi- filter contexte git
    }; //action payload içinde ama spread ile copyasını alıyorsun ve sadece filtred değil tüm products ile 2 instance ı alıyorsun
    //   Both of them are equal to my products that are coming from the payload, but I'm using the spread operator,
    // so I'm just copying the values.
    // I'm not referencing to the same place in the memory.
  }
  //84 -

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  //end of 84 _ then we need to sort controlled inputs az-za lowest highest  so we need to go filter context.js to create states

  // 90 -sortu değiştiriyor ve ardından functionalityi gerçekleştireceğiz
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  //END OF 90 - ardından  FİLTER CONTEXTE gidiyorsun yeni bir action
  //92
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      // console.log();
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  //end of 92- then we will go to filters for products page  any filters on the left of webpage  thus go to filter context .js  for filters

  //99 -
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    //filters is object we want to update it in filters // state.filters yazarak içerde we dont lose any values, ikincsis ise dynamic property reaching  set up property dynamically
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  //101 - ardından filters.js e git tekrar
  if (action.type === FILTER_PRODUCTS) {
    //117- filter  functionality (all products ve filter products olan iki arraya ihtiyacın var işlemler için )
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products]; //before filter anything sürekli allproductsın  fresh kopy ile start yapıyor
    //filtering   - text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    //category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    //company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }

    //colors - it is an array thus inside of filter we need to run one more call back function
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    //price

    tempProducts = tempProducts.filter((product) => product.price <= price);

    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts }; //search bar da bir şeyi silince array baştan fresh başlıyor if text durumu oluşmadığı için

    //end of 117- ardından cartta çalışacağız carta gideceğiz(cart context )
  }
  // end of 99 -filter contexte gidip useeefect içine  filteri yerleştiriyor updte filters ile ilgili  filter değişince useeffect ile onu update
  //116-
  if (action.type === CLEAR_FILTERS) {
    //RETURN DEFAULT VALUES -copy and paste filters in initial state filters
    return {
      ...state,
      filters: {
        ...state.filters, //bu hareket ile min ve maxın sıfırlanması elngelleniyor ve default neyse öyle kalsın sıfırlanmadan
        text: "",
        company: "all",
        color: "all",
        // min_price: 0, //bunları sil
        // max_price: 0, //bunları sil
        price: state.filters.max_price, //default value of the max price
        shipping: false,
      },
    };
  }
  //end of 116 - and now we will employ all filters functionality lets go to  filter products part in this js file
  throw new Error(`No Matching "${action.type}" - action type`);
};
//end of 70 --products page de  view çalışması  go to products page js  for creating filtres,sortin and product list
export default filter_reducer;
