import styled from "styled-components";

const Title = (props: {children: any}) => {
    return (
          <Slogan>
              {props.children}
          </Slogan>
    )
}

export default Title;

const Slogan = styled.h1`
  text-align: center;
  font-size: 7.2vh;
  line-height: 8vh;
  color: black;
  width: 64vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  z-index: 1;
  margin-top: 4vh;
  @media (max-width: 1023px) {
    margin-top: 3vh;
    line-height: 9vw;
    font-size: 8vw;
    width: 95vw;
  }
`