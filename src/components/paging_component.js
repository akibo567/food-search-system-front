
import styled from "styled-components";
import {StyledCommonButton} from "../common_style"

function PagingComponent(props) {

  const Next_Button_Onclick = () => {
    props.Set_Current_Pageno(props.Current_Pageno + 1);
  };

  const Prev_Button_Onclick = () => {
    props.Set_Current_Pageno(props.Current_Pageno - 1);
  };

  const Current_Page_Item_Amount_Min = () => {
    return props.Results_Available >= 1 ? (( (props.Current_Pageno - 1) * props.Page_Item_Amount) + 1) : "0";
  };

  const Current_Page_Item_Amount_Max = () => {
    return props.Results_Available < ( props.Current_Pageno * props.Page_Item_Amount) ? props.Results_Available 
    : ( props.Current_Pageno * props.Page_Item_Amount);
  };

  return(
  <StyledPagingContainer>
    <StyledNPButton
          onClick={() => {
            Prev_Button_Onclick();
          }}
          disabled={!props.Is_Loaded_Searched_List || props.Current_Pageno <= 1}
    >Prev</StyledNPButton>
    <StyledPagingText>
    件数:{Current_Page_Item_Amount_Min()}-
            {Current_Page_Item_Amount_Max()}/
            {props.Results_Available}
    </StyledPagingText>
        <StyledNPButton
          onClick={() => {
            Next_Button_Onclick();
          }}
          disabled={!props.Is_Loaded_Searched_List || props.Results_Available < ( (props.Current_Pageno) * props.Page_Item_Amount) + 1}
    >Next</StyledNPButton>
  </StyledPagingContainer>
  );
}

const StyledPagingContainer = styled.div`
  margin:10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledNPButton = styled(StyledCommonButton)`
  width:100px;
  height:50px;
  font-size: 20px;
`;

const StyledPagingText = styled.p`
  margin:10px;
  font-size: 20px;
`;

export default PagingComponent;