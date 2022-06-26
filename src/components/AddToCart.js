import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";
//63
const AddToCart = ({ product }) => {
  //122- 
 const {addToCart}=useCartContext()
  //end of 122
  const { id, stock, colors } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1); //sıfır amount anlamsız

  //65 - amount button functionality  
  const increase = () => {
    setAmount((oldAmount)=>{
      let tempAmount= oldAmount + 1
      if(tempAmount > stock) {
        //eğer yeni değer stock miktarından fazla ise maximum alabileceği değer  stock miktarıdır 
        tempAmount = stock
      }
      return tempAmount
    })
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  //end of 65 -şimdi big beast olan products sayfasına odaklanalım onun için ilk önce filter context setupı yapacak oraya gidiyoruz 
  return (
    <Wrapper>
      <div className="colors">
        <span>colors:</span>
        <div>
          {colors.map((color, index) => {
            // inline style background color geçti
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        {/* pass the props */}
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        {/* 123 onclick  and then go to cart reducer to handle that action  */}
        <Link to="/cart" className="btn" onClick={()=>addToCart(id,mainColor,amount,product)}>
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};
//end of 63- go to amount buttons js
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
