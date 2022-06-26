import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  //45 - properties that i am looking for loading,error,featured products önemli by iterating over and display each item products hepsine rahat yazabilmek için  alias veriyor

  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();
  if(loading){
    return <Loading/> 
    //hemen loading componenta gidiyor ardından errore 47 oluyor 
  }
  if(error) {
    return <Error/>
  }
  return <Wrapper className="section">
    <div className="title">
      <h2>featured products</h2>
      <div className="underline"></div>
    </div>
    <div className="section-center featured">
      {/* //49  here iterate over featured array yukarıda buraya getirdiğimiz aliaslı arrayi 3 tane ürün göstermek istiyor sayfada hero daki featured productsta  */}
      {featured.slice(0,3).map((product)=>{
        return <Product key={product.id} {...product}/>
      })}
    </div>
    {/* //160 - all products button ekle  */}
    <Link to="/products" className="btn">all products</Link>
  </Wrapper>;
};
//end of  45 -product componenta git  
const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
