
import React, { useState, useEffect } from "react";
import axios from "axios";

import ShopList from "../components/shop_list"
import {API_ENDPOINT} from "../settings"

function Search() {
  const [Latitude_Data, Set_Latitude_Data] = useState();
  const [Longitude_Data, Set_Longitude_Data] = useState();

  const [Searched_List, Set_Searched_List] = useState();

  const axios_instance = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    timeout: 2000,
  });

  const Search_Button_Onclick = () => {
    axios_instance
    .post('/search_shop', {
      Latitude: Latitude_Data,
      Longitude: Longitude_Data
    })
    .then(function (response) {
      Set_Searched_List(response.data);
    })
    .catch(function () {
      alert("通信エラー");
    });
  };
  
  useEffect(() => {
    // Update the document title using the browser API
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      Set_Latitude_Data(latitude);
      Set_Longitude_Data(longitude);
    });
  });

  return (
    <div className="Search_Screen">
     <p>latitude:{Latitude_Data}</p>
     <p>Longitude:{Longitude_Data}</p>
     <button
            onClick={() => {
              Search_Button_Onclick();
            }}
            className="load_button"
      >検索</button>
     {Searched_List && <ShopList
        shop_items={Searched_List}
     />}
    </div>
  );
}

export default Search;
