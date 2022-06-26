import React from 'react'
import styled from 'styled-components'
import Product from './Product'

//74 -grab products prop
const GridView = ({products}) => {
  return <Wrapper>
    <div className="products-container">
      {/* //featured da sergilediğimiz gibi aynı  tüm ürünleri sergileyeceğiz- every item is an object   */}
      {products.map((product)=>{
        return <Product key={product.id} {...product}/>
      })}
    </div>
  </Wrapper>
}
//end of 74 - go back to filter context for grid view 
const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView
