import React, { useEffect } from "react";
//final 4 - usenavigate oluyor usehistory 
import { useParams, useNavigate } from "react-router-dom";
//in order to access the url parameters  we use hook which is called useparams (object with a property of id )
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  //57

  // console.log(useParams()); //bir id görüyorsun objectte onu hemen setup id yaptı  paramsla ve destructure yaptı hemen
  const { id } = useParams(); // get me the id property out of this object
  const navigate = useNavigate(); //error anında 3 saniyede otomatik geri dönme için bu hooku da aktif ediyor
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext(); //alis veriyor
  // when i load this page i want to invoke useefect and set up my fetch single product

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]); //id değişince fetch new product
  // console.log(product);
  //error varsa 3 saniyede ana sayfaya döndürüyor otomatik, error default değil
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  // next single product base return yapacaz single product consoldaki elemanları destructure yapıyoruz bir bir
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product; // all of them coming form product
  return (
    <Wrapper>
      {/* //dinamik şekilde ürün ismi yazsın diye page hero jse gidiyor ve pageherodaki product propu buraya alıp fazladan link ve isim eğer single prodcut tıklanırsa gösteriyor başlıkta   */}
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          {/* //images prop geçiyor product images'a sonra oraya git */}
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            {/* //60 now display the stars and pass stars,reviews props and go to stars js  */}
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="description">{description}</p>
            <p className="info">
              <span>Available:</span>
              {stock > 0 ? " In Stock" : "out of stock "}
            </p>
            <p className="info">
              <span>SKU:</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand:</span>
              {company}
            </p>
            <hr />
            {/* //sıfırdan fazlaysa stock yani stokta ürün varsa sadece o zaman  bu componentı göster diyorsun, stocksuz üründe gösterme addto cartı   */}
            {/* //62 tüm productu(satır 52 den başlayan 10 satırlık productu ) prop geç ve add to cart jse git   */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};
// end of 57 -
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
