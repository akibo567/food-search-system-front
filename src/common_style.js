import styled from "styled-components";


const StyledCommonButton = styled.button`
    background-color: ${(props)=>props.disabled?'white':'black'}; ;
    color: ${(props)=>props.disabled?'#c0c0c0':"white"}; ;
    border-radius: 3px;
`;


export {StyledCommonButton};
