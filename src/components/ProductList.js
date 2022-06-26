import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  //73 - tüm products a şu an ihtiyacın yok  alias veriyor productsa //76 grid view u ekle
  const { filtered_products: products, grid_view } = useFilterContext();
  // if product filter array less than 1 ve empty ise
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        soryy no products matched your search...
      </h5>
    );
  }
  if(grid_view === false) {
    return <ListView products={products}/>
  }
  //end of 76 -go to list view 
  return <GridView products={products}>product list</GridView>;
};
//end of 73 - hemen grid viewe git
export default ProductList;
