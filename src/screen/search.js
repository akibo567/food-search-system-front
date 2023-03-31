
import React, { useState, useEffect } from "react";
import axios from "axios";

import ShopList from "../components/shop_list"
import {API_ENDPOINT} from "../settings"
import {StyledCommonButton} from "../common_style"

import styled from "styled-components";



function Search() {
  const [Latitude_Data, Set_Latitude_Data] = useState(null);
  const [Longitude_Data, Set_Longitude_Data] = useState(null);

  const [Is_Loaded_Geolocation, Set_Is_Loaded_Geolocation] = useState(false);
  const [Is_Supported_Geolocation, Set_Is_Supported_Geolocation] = useState(false);
  const [Is_Loaded_Searched_List, Set_Is_Loaded_Searched_List] = useState(false);
  const [Searched_List, Set_Searched_List] = useState();

  const [Current_Pageno, Set_Current_Pageno] = useState(1);
  const [Page_Item_Amount, Set_Page_Item_Amount] = useState(9);
  const [Results_Available, Set_Results_Available] = useState(0);

  const [Selected_Range, Set_selectedRange] = useState(1);


  const axios_instance = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    timeout: 2000,
  });

  const Search_Button_Onclick = () => {
    Search_Shop(true);
  };

  const Next_Button_Onclick = () => {
    Set_Current_Pageno(Current_Pageno + 1);
  };

  const Prev_Button_Onclick = () => {
    Set_Current_Pageno(Current_Pageno - 1);
  };

  const Search_Shop = (Refresh) => {
    Set_Is_Loaded_Searched_List(false);
    axios_instance
    .post('/search_shop', {
      Latitude: Latitude_Data,
      Longitude: Longitude_Data,
      Range: Selected_Range,
      Current_Pageno: Current_Pageno,
      Page_Item_Amount: Page_Item_Amount,
    })
    .then(function (response) {
      Set_Searched_List(response.data.shop);
      Set_Results_Available(response.data.results_available);
      Set_Is_Loaded_Searched_List(true);
      if(Refresh){
        Set_Current_Pageno(1);  
      }
    })
    .catch(function () {
      alert("通信エラー");
    });
  };
  
  useEffect(() => {
    if(navigator.geolocation){
      Set_Is_Supported_Geolocation(true);
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        Set_Latitude_Data(latitude);
        Set_Longitude_Data(longitude);
      });
    }
  },[Is_Supported_Geolocation]);

  useEffect(() => {
    if(Is_Loaded_Searched_List){
      Search_Shop(false);
    }
  },[Current_Pageno]);

  return (
    <div className="Search_Screen">
     {
        !Is_Supported_Geolocation ? 
          <p>Geolocation API is not supported.</p>
          :
          (Latitude_Data === null || Longitude_Data === null) ?
            <p>Loaging Geolocation...</p>
            :
            <p>現在地 偉度:{Latitude_Data} 経度:{Longitude_Data}</p>
     }

    <StyledSearchArea>
      現在地からの範囲：
      <select
            value={Selected_Range}
            onChange={e => Set_selectedRange(e.target.value)}
          >
            <option value="1">300m</option>
            <option value="2">500m</option>
            <option value="3">1000m</option>
            <option value="4">2000m</option>
            <option value="5">3000m</option>
          </select>


      <div>
        <StyledSearchButton
            onClick={() => {
              Search_Button_Onclick();
            }}
            disabled={Latitude_Data === null || Longitude_Data === null}
            className="load_button"
      >検索</StyledSearchButton>
      </div>

     </StyledSearchArea>

      <StyledNPButton
            onClick={() => {
              Prev_Button_Onclick();
            }}
            disabled={!Is_Loaded_Searched_List || Current_Pageno <= 1}
            className="load_button"
      >Prev</StyledNPButton>
      件数:{( (Current_Pageno - 1) * Page_Item_Amount) + 1}-
              {( Current_Pageno * Page_Item_Amount)}/
              {Results_Available}
           <StyledNPButton
            onClick={() => {
              Next_Button_Onclick();
            }}
            disabled={!Is_Loaded_Searched_List || Results_Available < ( (Current_Pageno) * Page_Item_Amount) + 1}
            className="load_button"
      >Next</StyledNPButton>
     {Searched_List && <ShopList
        shop_items={Searched_List}
     />}
    </div>
  );


}

const StyledNPButton = styled(StyledCommonButton)`
  width:200px;
  height:50px;
`;

const StyledSearchButton = styled(StyledCommonButton)`
  width:200px;
  height:50px;
`;

const StyledSearchArea = styled.div`
  margin:10px;
  font-size: 15px;
`;

export default Search;
