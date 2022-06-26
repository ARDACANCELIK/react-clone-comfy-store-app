import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//58- hemen bir prop ile deta düzeltmesi dinamik başlık atama single productta ürün göstermek için  product  
const PageHero = ({title,product}) => {
  //31 about pagedeki title'ı hemen destructure yapıyor üstte sonra altta hemen wrapper ile style component veriyor css 
  return <Wrapper>
    <div className="section-center">
      <h3>
        <Link to="/">Home</Link>
        {product && <Link to="/products">/Products</Link> }{title}
        {/* sayfadan sayfaya geçerken diplay title her sayfa ile değişiyor yukarda destructure yaptığımız  ayrıca product doğru ise bir link daha kotmak isiyorum yani single product içindeysek product'un linkini de yazı olarak gösteriyoruz   */}
      </h3>
    </div>
  </Wrapper>
}
//end of 31 şimdi check out page a git 
const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
