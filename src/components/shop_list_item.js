
import React, { useState, useEffect } from "react";

function ShopListItem(props) {

  const Detail_Button_Onclick = () => {

  };

  useEffect(() => {

  });

  return (
    <div className="Menu_List_Component">
      <p>店舗名称:{props.shopitem.name}</p>
      <p>アクセス:{props.shopitem.acccess}</p>
      <p>サムネイル画像:{props.shopitem.thumb_img}</p>
    </div>
  );
}

export default ShopListItem;
