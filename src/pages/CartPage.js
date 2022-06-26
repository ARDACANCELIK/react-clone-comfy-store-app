import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  //126- page 100 tüm sayfayı işgal ediyor
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>your cart is empty </h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return <main>
    <PageHero title="cart"/>
    <Wrapper className="page">
      <CartContent/>
    </Wrapper>
  </main>;
};
//END OF 126 - local stroage fonksiyonu yazmak için cart contexte git 
const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
