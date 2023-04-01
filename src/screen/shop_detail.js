
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import {StyledCommonButton, StyledHeader} from "../common_style"


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
        <StyledHeader>
          <StyledStoreName>{Shop_Item.name}</StyledStoreName><StyledStoreNameKana>({Shop_Item.name_kana})</StyledStoreNameKana>
        </StyledHeader>
        <p><img src={Shop_Item.thumb_img} alt=""/></p>
        {Shop_Item.urls_pc &&  <a target="_blank" rel="noreferrer" href={Shop_Item.urls_pc}>
          <StyledShopButton>ホットペッパーのページへ</StyledShopButton></a>}
        {((!isMobile && Shop_Item.coupon_urls_pc) || (isMobile && Shop_Item.coupon_urls_sp)) && 
          <>
              <a target="_blank"  rel="noreferrer" href={isMobile? Shop_Item.coupon_urls_sp : Shop_Item.coupon_urls_pc}>
                <StyledShopButton>クーポンページへ</StyledShopButton>
              </a>
          </>
        }

        <p>{Shop_Item.catch}</p>
        <StyledSection>住所:</StyledSection>
          <p>{Shop_Item.location}</p>
        <StyledSection>駐車場:</StyledSection>
          <p>{Shop_Item.parking}</p>
        <StyledSection>定休日:</StyledSection>
          <p>{Shop_Item.close}</p>
        <StyledSection>営業時間:</StyledSection>
          <p>{Shop_Item.business_hour}</p>
        <StyledSection>平均ディナー予算:</StyledSection>
          <p>{Shop_Item.budget_average}</p>
        <StyledSection>総席数:</StyledSection>
          <p>{Shop_Item.capacity}{Shop_Item.party_capacity && "(宴会最大収容"+Shop_Item.party_capacity+"人)"}</p>
        <StyledSection>個室:</StyledSection>
          <p>{Shop_Item.private_room === 1 ? "あり" : "なし"}</p>
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
  font-size: 30px;
  margin :  0px;
  color: white;
`;

const StyledStoreNameKana = styled.span`
  font-size: 15px;
  color: white;
`;

const StyledSection = styled.h2`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom:1px solid #c0c0c0;
`;

const StyledShopButton = styled(StyledCommonButton)`
  font-size: 15px;
  margin-right:10px;
  margin-bottom:10px;
`;

export default ShopDetail;
