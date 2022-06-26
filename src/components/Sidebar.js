import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
// toggle da işe yarayacak bir üstteki
import { FaTimes } from "react-icons/fa";
import { links } from "../utils/constants";
import styled from "styled-components";
import CartButtons from "./CartButtons";
import { useUserContext } from "../context/user_context"; // login yapıp yapmadığı ile ilgili değeri verecek

const Sidebar = () => {
  //7- toggle yapabilmek için true - checkoutu manuel yapıyor
  //toggle yapıyor classname ile -buradan product context setupa gidecek ama ondan önce appi warap yapıyor indexte products provide ile
  //18- sistem çalışıyormu kontrol
  // const data= useProductsContext()
  // console.log(data);
  //end of 18- bunu hemen uncomment yap çünkü amaç  sidebar togglea  functionality
  //19-
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  //154
  const { myUser } = useUserContext();
  //end of 154
  // 20- uncomment this
  // const isOpen = false;
  //21- isOpen'ı  isSidebarOpen yapıyor global property ile tekrar yapıyor yani productcontext ten gelen property ile
  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logo} alt="comfy sloth " className="logo" />
          {/* //22 buttona basınca kapatmak istiyor onClick bu kapanınca linklerde doğal olarak kapanıyor  */}
          <button className="close-btn" type="button" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {/* //hemen property olarakta destructure yapıyor her link object sonuçta  */}
          {links.map(({ id, text, url }) => {
            return (
              //23- linke close click
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {/* //155- and than go to cart totals  */}
          {myUser && (
            <li>
              {/* //24 burayada close onclick  ardından cartbuttonsa gidip onu da basınca  kapatma işlemini yapıyor   */}
              <Link to="/checkout" onClick={closeSidebar}>
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
