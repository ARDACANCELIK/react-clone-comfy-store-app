import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

//66 - her zaman filtre yaparken iki instance a dikkat et bir tüm arrayi muhafaza eden instance çünkü her filtre sonrası kullanıcı başa dönmek ister aksi halde filtrenin filtresi olur hızla sıfıra gidersin, ikinci is filtre edilen instance  not:  tüm olay ise  ürünleri products contextten filtre contextte geçmek istiyorum böylece kullanacam you need a action to do it

const initialState = {
  filtered_products: [], //that is the array always changing as user change the values with filtred
  all_products: [], //default all products when you want ot go back
  //75 - grid view e başladık ardında product liste git
  grid_view: true,
  //85 - ardından hemen update sort için state valueyu değiştircek fonksiyon
  sort: "price-lowest", // BY DEFAULT
  //93 -bir object kullanacam birdem fazla state valuesu olacak burada  for controlled inputs isim sana kalmış
  filters: {
    text: "",
    company: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  //end of 93- filter reducera git ne zaman productsı yüklersen o zaman filterıdaki değeri mesela en yüksek değerli ürünü bulursun go to filter reducer
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //68 get my products from products context bu şart çünkü doğrudan filtre reducera geçemeyeceğime göre ilk önce filtre context almam lazım ürünleri   i need to do it through filtre provider component, yinede doğrudan intial state a geçemiyorsun useeefect ile mount edip dispatch action yapıyorsun
  const { products } = useProductsContext();
  //end of 68
  const [state, dispatch] = useReducer(reducer, initialState);

  //69 - bu işlemden sonra ise handle it in filtre reducer  reducer
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); //başlangıçta empty o yüzden products değişince yap işlemi
  //91 - another useeffect
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });  //bunu da ekledi - filter reducera tekrar git
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]); //100   state.filtersi ekledi
  //end of 91-  then go to filter reducer to handle that
  //79 -set up two actions and two dispatches
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  //end of 79

  //86 -
  const updateSort = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value }); //we should handle it in reducer
  };
  //end of 86- then pass this down to provider

  //96-put the as placeholders first we will give some functionality later
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(name,value);
    // now ı want to disptch an action that change state value
    //105 -because it is a button
    if (name === "category") {
      value = e.target.textContent;
    }
    //end of 105 - ardından  companies filterı yazacak  filters.js e git
    //108-
    if (name === "color") {
      value = e.target.dataset.color;
    }
    //end of 108 - go to filters
    //111- böylece sonraki sayıları string olmaktan kurtardık
    if (name === "price") {
      value = Number(value);
    }
    //end of 111 - go to filter.js for shipping and clear filter works
    //113- checkbox için
    if (name === "shipping") {
      value = e.target.checked;
    }

    //end of 113- clears filtersı da hallet  filtersa git
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  //115- clear filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  //end of 115- filter reducea gidip handle it

  //end of 96 - now go filter reducer to handle it over there  but before it  you pass down values to providers, and do filters  then go to reducer
  return (
    //72 pass the initial state values to value yani all products ve filtred products demek  - then go to product list js //80- PASS THEM down to provider and then attach the functions to buttons  then deal them in the reducer (sort js e git )  //87- updatesortu geç , sonra sort.js e geçip acces them //97- pass down updateFilters,clearFilters and then go to filters js
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
//end of 66- ama hemen index js a gidip wrap our application , filtre provideı gidip Products provider içinde ama appi saracak şekilde koyalım
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
