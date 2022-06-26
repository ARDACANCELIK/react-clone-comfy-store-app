import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  //30 after 30 page hero 
  return <main>
    <PageHero title="about"/>
    <Wrapper className='page section section-center'>
    <img src={aboutImg} alt="nice-desk" />
    <article>
      <div className="title">
        <h2>our story</h2>
        <div className="underline"></div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cumque ex atque illum, iusto quod eligendi perferendis expedita nesciunt exercitationem minus a consequuntur inventore placeat similique numquam laboriosam dignissimos, fugit quas provident nisi minima. In nisi tenetur, eaque aliquam obcaecati ea incidunt reiciendis labore fugit perspiciatis temporibus facilis qui nesciunt?</p>
      </div>
    </article>
    </Wrapper>
    {/* //end of 30  */}
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
