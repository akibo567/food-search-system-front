
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function ShopDetail(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [Shop_Item, Set_Shop_Item] = useState(null);


  useEffect(() => {
    //データがない場合、TOPにリダイレクト
    if(!location.state){
      navigate('/');
    }else{
      Set_Shop_Item(location.state.shopitem);
    }
  });

  return (
    <StyledShopDetail>
      {Shop_Item &&
        <div className="Detail_Screen">
        <StyledStoreName>{Shop_Item.name}</StyledStoreName>
        <p><img src={Shop_Item.thumb_img} alt=""/></p>
        <StyledSection>住所:</StyledSection>
        <p>{Shop_Item.location}</p>
        <StyledSection>営業時間:</StyledSection>
          <p>{Shop_Item.business_hour}</p>
        </div>
      }
    </StyledShopDetail>
  );
}

const StyledShopDetail = styled.div`
  text-align: left;
  font-size: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
`;

const StyledStoreName = styled.h1`
  text-align: left;
  font-size: 30px;
  margin-bottom: 10px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const StyledSection = styled.h2`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom:1px solid #c0c0c0;
`;

export default ShopDetail;
