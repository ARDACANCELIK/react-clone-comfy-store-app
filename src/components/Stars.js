import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
//61
const Stars = ({ stars, reviews }) => {
  // console.log(stars, reviews);

  // now new array -empty array with five items ,  ikinci eleman call back function fakat undefined olan item ilk item benim için önemli değil 
  const tempStars = Array.from({length:5},(_,index)=>{
    //index 0- 4 
    const number = index + 0.5
    return (
      <span key={index}>
        {stars >= index +1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  })
  return (
    <Wrapper>
      <div className="stars">
        {/* bir tane  star  */}
        {/* <span>
          {stars >=1?<BsStarFill/> :stars >= 0.5 ? <BsStarHalf/>: <BsStar/>}
        </span> */}

        {/* array aproach below  */}

          {tempStars}

        {/* end of star */}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};
//end of 61- now go to  finish add to cart component single product addto cart and colors thing bunun için add to carta gitmeliyiz ama önce single productta addto cart  componentına prop geçeceğiz  
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
