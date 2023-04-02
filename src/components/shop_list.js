
import React from "react";
import ShopListItem from "./shop_list_item";
import styled from "styled-components";

function ShopList(props) {

  return (
    <StyledShopListComponent>
      {props.shop_items.map((item,index) => {
        return (
          <ShopListItem
            shopitem={item}
            key={index}
          />
        );
      })}
    </StyledShopListComponent>
  );
}

const StyledShopListComponent = styled.div`
  //width: 90%;
  //margin-left: 5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default ShopList;
