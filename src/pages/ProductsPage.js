import React from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'

const ProductsPage = () => {
  //71 
  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        {/* //filtr,sort,product list olacak burada  */}
        <div className="section-center products">
          <Filters/>
          <div>
            <Sort/>
            <ProductList/>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
//end of 71- product liste gidiyoruz şimdi ama ondan önce filtre contexte gidip valueları geçiyoruz 
const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
