
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div class="shop_detail">
      {Shop_Item &&
        <div className="Detail_Screen">
        <p>店舗名称:{Shop_Item.name}</p>
        <p>住所:{Shop_Item.location}</p>
        <p>営業時間:{Shop_Item.business_hour}</p>
        <p><img src={Shop_Item.thumb_img} alt=""/></p>
        </div>
      }
    </div>
  );
}

export default ShopDetail;
