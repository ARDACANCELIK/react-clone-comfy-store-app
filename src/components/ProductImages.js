import React, { useState } from "react";
import styled from "styled-components";

// //59 objet property yaz  images(bu prop  sin gle producttan gelen ) , amaç single product içersinde resimleri dokundukça değiştirmek  main image ile başlayıp diğerlerini tıkladıkça main image yapmak  images bir array , images default olarak undefined bu da diyorki eğer images undefined ise empty array başlangıç olarak bu şekilde çünkü array içindeki ilk resmi atıyorsun ama o anda undefined o yüzden bu array durumunu hemen belirtiyor, aşağıda main url yazınca onu yukarıda güncelledi- parametre undefined olunca default parametre koyuyor ,
// initially images was undefined because : Because we fetch product and initally its an empty object and in the empty object images property is undefined.


const ProductImages = ({ images = [{ url: " " }] }) => {
  const [main, setMain] = useState(images[0]);
  // console.log(images);
  // console.log(main); //url buradan geliyor
  return (
    <Wrapper>
      <img src={main.url} alt="main image" className="main" />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])}
              //kahverengş çerçeve ile hangi resmin aktif olduğunu gösteriyor
              className={`${image.url===main.url ?"active":null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
//end of 59 - şimdi stars yapmaya gidiyoruz single productta 
const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
