import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg"; // logo için full path olması lazım javascript gibi değil
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";

const Nav = () => {
  //27- bu sefer açmak için 
  const {openSidebar}=useProductsContext()
  //end of 27 
  //4 Navbar - bundan sonra cartbutton js. e gidip cart buttonsu yapıyor(cart ve login buttonları aslında link ) 
  //152  
  const {myUser}=useUserContext()
  //end of 152 
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          {/* link içine yerleştiriyor elementleri küçük ekranda da kullanabilmek ve responsive yapmak için  logo img ve linkler  */}
          <Link to="/">
            <img src={logo} alt="comfy sloth" />
          </Link>
          {/* //28 navbar buttona toggle işlevini on click sidebar openı   vereceğiz ki sidebar açılsın  */}
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        {/* buraya ul yapıp içine li koyabilirsin ama  bu bad practise because we have a sidebar  onun yerine utilse gidip bu linkleri görelim ve buraya manuel koymak yerine links map ile koyacak  - cart buttons dediği(cart ve login aslında bunlar link button değil) */}
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {/* //153 if the user exists only then display the check out link and i want to the same thing in the sidebar as well go to sidebar   */}
          {myUser && <li>
            <Link to="/checkout">checkout</Link>
            </li>}
          {/* end of 153  */}
        </ul>
        <CartButtons/>
      </div>
    </NavContainer>
  );
  //end of 4  -
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
