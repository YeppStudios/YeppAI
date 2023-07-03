import styled from "styled-components";

interface Title {
    width: string,
    fontSize: string,
    textAlign: string,
    color: string,
    mobileFontSize: string,
    mobileTextAlign: string
}

const Title = (props: {children: any, fontSize: string, width: string, textAlign: string, color: string, mobileFontSize: string, mobileTextAlign: string}) => {
    return (
          <Slogan fontSize={props.fontSize} width={props.width} textAlign={props.textAlign} color={props.color} mobileFontSize={props.mobileFontSize} mobileTextAlign={props.mobileTextAlign}>
              {props.children}
          </Slogan>
    )
}

export default Title;

const Slogan = styled.h2<Title>`
    font-size: ${props => props.fontSize || '2.5vh'};
    width: ${props => props.width || 'auto'};
    text-align: ${props => props.textAlign || 'center'};;
    color: ${props => props.color || 'white'};
    font-weight: 700;
    line-height: 1.4;
  @media (max-width: 1023px) {
    width: 90vw;
    font-size: ${props => props.mobileFontSize || '2.5vh'};
    text-align: ${props => props.mobileTextAlign || 'center'};;
  }
`