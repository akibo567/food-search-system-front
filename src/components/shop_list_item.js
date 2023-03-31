
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {StyledCommonButton} from "../common_style"

function ShopListItem(props) {
  const navigate = useNavigate();

  const Detail_Button_Onclick = () => {
    navigate('/shop_detail' ,{ state: { shopitem: props.shopitem } });
  };

  useEffect(() => {

  });

  return (
    <StyledMenuListComponent>
      <img src={props.shopitem.thumb_img} alt=""/>
      <p>店舗名称:{props.shopitem.name}</p>
      <p>アクセス:{props.shopitem.acccess}</p>
      <StyledDetailButton
            onClick={() => {
              Detail_Button_Onclick();
            }}
            className="detail_button"
      >詳細</StyledDetailButton>
    </StyledMenuListComponent>
  );
}

const StyledMenuListComponent = styled.div`
  text-align: center;
  font-size: 15px;
  width:300px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 2px solid #000000;
  border-radius: 30px;
  padding: 5px;
`;

const StyledDetailButton = styled(StyledCommonButton)`
  width:100px;
  height:30px;
`;

export default ShopListItem;
