
import React, { useState, useEffect } from "react";
import ShopListItem from "./shop_list_item";
import styled from "styled-components";

function ShopList(props) {

  const Detail_Button_Onclick = () => {

  };

  useEffect(() => {

  });

  return (
    <StyledShopListComponent>
      {props.shop_items.map((item) => {
        return (
          <ShopListItem
            shopitem={item}
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
