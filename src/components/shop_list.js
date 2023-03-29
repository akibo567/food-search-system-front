
import React, { useState, useEffect } from "react";
import ShopListItem from "./shop_list_item";

function ShopList(props) {

  const Detail_Button_Onclick = () => {

  };

  useEffect(() => {

  });

  return (
    <div className="Shop_List_Component">
      {props.shop_items.map((item) => {
        return (
          <ShopListItem
            shopitem={item}
          />
        );
      })}
    </div>
  );
}

export default ShopList;
