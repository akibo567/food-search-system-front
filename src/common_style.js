import styled from "styled-components";


export const StyledCommonButton = styled.button`
    background-color: ${(props)=>props.disabled?'white':'black'}; ;
    color: ${(props)=>props.disabled?'#c0c0c0':"white"}; ;
    border-radius: 3px;
`;

export const StyledHeader = styled.header`
  text-align: left;
  margin-bottom: 10px;
  background-color: black;
  padding: 5px;
  color: white;
`;