import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
// login olunca ikonlar değişiyor
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

const CartButtons = () => {
  //25 - amaç sidebarda herhangi bir tuaş basıldığında oraya yöneldiğin için her tuşa basıldığında sidebarı kapatıyoruz aslında product,about,home, checkout,carbutton bunu gerçekleştirdirmek için datayı geç aşağıda tuşu yerleştir tuş kısmında
  const { closeSidebar } = useProductsContext();
  //end of 25
  //138-
  const { total_items } = useCartContext();
  //end of 138
  //5 - bunlar aynı zamanda link  logout auth0 ile bağlantılı bir button iken cart aslında bir link, buradaki classname aslında navbarda,,,, burada yok gözükse bile  none ve 992px üstü diplay grid yapıyor ondan öncesi display none - ayrıca aşağıdaki linke tıklayınca sidebarı kapatmak istiyorum sidebar açıkkken linke tıklayınca o linke gidersin sidebar kapanır - burası dinamik olacak şimdilik böyle
  // 147 -
  const { loginWithRedirect, myUser, logout } = useUserContext();
  //end of 147
  return (
    <Wrapper className="cart-btn-wrapper">
      {/* //26 close sidebar onclick,,,,,, sonra navbara git sidebarı görmemizi sağlayan button ile ilgili işlemi yapmak puzzleın son parçası   */}
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          {/* //139- hard coded 12  {totals_items} olarak değişti -sonra cart contexte git  useefect için  */}
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
      {/* //148 - 149 ardından  logine  onClick withredirect  ekliyoruz üsttarafta ardından  user contexte git  */}
      {/* //151 login olursa log outu log out olursam logini göstermelisin - toggle yani  ardından navbara git  hidecheckout için  */}
      {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};
//end of 5 - footera js gidiyoruz sşimdi ondan sonra da sidebara gideceğiz
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
