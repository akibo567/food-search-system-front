
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
  const [Search_Query, Set_Search_Query] = useState();
  const [Searched_List, Set_Searched_List] = useState();

  const [Current_Pageno, Set_Current_Pageno] = useState(1);
  const [Page_Item_Amount, Set_Page_Item_Amount] = useState(10);
  const [Results_Available, Set_Results_Available] = useState(0);

  const [Selected_Range, Set_selectedRange] = useState(1);
  const [New_Page_Item_Amount, Set_New_Page_Item_Amount] = useState(10);
  const [Search_Keyword, Set_Search_Keyword] = useState("");
  const [Is_Checked_Private_Room, Set_Is_Checked_Private_Room] = useState(false);
  const [Is_Checked_Lunch,Set_Is_Checked_Lunch] = useState(false);
  const [Is_Checked_Midnight_Meal,Set_Is_Checked_Midnight_Meal] = useState(false);


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
    let Post_Search_Query;
    if(Refresh){
      Set_Page_Item_Amount(New_Page_Item_Amount);
      Post_Search_Query={
        Latitude: Latitude_Data,
        Longitude: Longitude_Data,
        Range: Selected_Range,
        Current_Pageno: Current_Pageno,
        Page_Item_Amount: New_Page_Item_Amount,
        Keyword: Search_Keyword,
        Private_Room: Is_Checked_Private_Room? 1 : 0,
        Lunch: Is_Checked_Lunch? 1 : 0,
        Midnight_Meal: Is_Checked_Midnight_Meal? 1 : 0,
      }
    }else{
      Post_Search_Query = Search_Query;
      Post_Search_Query.Current_Pageno = Current_Pageno;
    }
    Set_Search_Query(Post_Search_Query);
    axios_instance
    .post('/search_shop', Post_Search_Query)
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

      <StyledAppTitle>飲食店検索システム</StyledAppTitle>
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
      <StyledSearchAreaTitle>検索条件</StyledSearchAreaTitle>
        <StyledSearchAreaLabel>
        現在地からの範囲:
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
        </StyledSearchAreaLabel>
        <StyledSearchAreaLabel>
          キーワード:
          <input
            value={Search_Keyword}
            onChange={e => Set_Search_Keyword(e.target.value)}
          />
        </StyledSearchAreaLabel>
        <StyledSearchAreaLabel htmlFor="private_room">
          個室あり:
        <input
          type="checkbox"
          id="private_room"
          checked={Is_Checked_Private_Room}
          onChange={() => Set_Is_Checked_Private_Room(prevState => !prevState)}
        />
        </StyledSearchAreaLabel>

      <StyledSearchAreaTopic>営業時間:</StyledSearchAreaTopic>

        <StyledSearchAreaLabel htmlFor="lunch">
          ランチあり:
        <input
          type="checkbox"
          id="lunch"
          checked={Is_Checked_Lunch}
          onChange={() => Set_Is_Checked_Lunch(prevState => !prevState)}
        />
        </StyledSearchAreaLabel>
        <StyledSearchAreaLabel htmlFor="midnight_meal">
          23時以降食事OK:
        <input
          type="checkbox"
          id="midnight_meal"
          checked={Is_Checked_Midnight_Meal}
          onChange={() => Set_Is_Checked_Midnight_Meal(prevState => !prevState)}
        />
        </StyledSearchAreaLabel>

      <StyledSearchAreaTopic>表示設定:</StyledSearchAreaTopic>

        <StyledSearchAreaLabel>
          最大表示件数:
          <select
              value={New_Page_Item_Amount}
              onChange={e => Set_New_Page_Item_Amount(e.target.value)}
            >
              <option value={5}>5件</option>
              <option value={10}>10件</option>
              <option value={25}>25件</option>
              <option value={50}>50件</option>
            </select>
        </StyledSearchAreaLabel>


    </StyledSearchArea>

      <div>
        <StyledSearchButton
            onClick={() => {
              Search_Button_Onclick();
            }}
            disabled={Latitude_Data === null || Longitude_Data === null}
      >検索</StyledSearchButton>
      </div>


    
      <StyledPagingContainer>
        <StyledNPButton
              onClick={() => {
                Prev_Button_Onclick();
              }}
              disabled={!Is_Loaded_Searched_List || Current_Pageno <= 1}
        >Prev</StyledNPButton>
        <StyledPagingText>
        件数:{( (Current_Pageno - 1) * Page_Item_Amount) + 1}-
                {Results_Available < ( Current_Pageno * Page_Item_Amount)? Results_Available : ( Current_Pageno * Page_Item_Amount)}/
                {Results_Available}
        </StyledPagingText>
            <StyledNPButton
              onClick={() => {
                Next_Button_Onclick();
              }}
              disabled={!Is_Loaded_Searched_List || Results_Available < ( (Current_Pageno) * Page_Item_Amount) + 1}
        >Next</StyledNPButton>
      </StyledPagingContainer>

     {Searched_List && <ShopList
        shop_items={Searched_List}
     />}
    </div>
  );


}

const StyledAppTitle = styled.h1`
  text-align: left;
  font-size: 30px;
  margin-bottom: 10px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const StyledNPButton = styled(StyledCommonButton)`
  width:100px;
  height:50px;
  font-size: 20px;
`;

const StyledPagingText = styled.p`
  margin:10px;
  font-size: 20px;
`;

const StyledPagingContainer = styled.div`
  margin:10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledSearchButton = styled(StyledCommonButton)`
  width:200px;
  height:50px;
  font-size: 20px;3
`;

const StyledSearchArea = styled.div`
  //margin:10px;
  font-size: 15px;
  border: 2px solid #c0c0c0;
  padding-bottom : 15px;
  padding-left : 10px;
  padding-right : 10px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 10px;
`;

const StyledSearchAreaTitle = styled.h2`
  font-size: 20px;
  border-bottom:1px solid #c0c0c0;
`;

const StyledSearchAreaTopic = styled.h3`
  font-size: 17px;
  margin: 2px;
`;

const StyledSearchAreaLabel = styled.label`
  font-size: 15px;
  margin-right: 10px;
`;



export default Search;
