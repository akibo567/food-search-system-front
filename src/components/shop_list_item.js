
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShopListItem(props) {
  const navigate = useNavigate();

  const Detail_Button_Onclick = () => {
    navigate('/shop_detail' ,{ state: { shopitem: props.shopitem } });
  };

  useEffect(() => {

  });

  return (
    <div className="Menu_List_Component">
      <p>店舗名称:{props.shopitem.name}</p>
      <p>アクセス:{props.shopitem.acccess}</p>
      <p>サムネイル画像:{props.shopitem.thumb_img}</p>
      <button
            onClick={() => {
              Detail_Button_Onclick();
            }}
            className="detail_button"
      >詳細</button>
    </div>
  );
}

export default ShopListItem;
