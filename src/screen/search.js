
import React, { useState, useEffect } from "react";
import axios from "axios";

import ShopList from "../components/shop_list"
import PagingComponent from "../components/paging_component"
import {API_ENDPOINT} from "../settings"
import {StyledCommonButton, StyledHeader} from "../common_style"

import styled from "styled-components";



function Search() {
  const [Latitude_Data, Set_Latitude_Data] = useState(null);
  const [Longitude_Data, Set_Longitude_Data] = useState(null);

  const [Is_Supported_Geolocation, Set_Is_Supported_Geolocation] = useState(false);
  const [Is_Loaded_Searched_List, Set_Is_Loaded_Searched_List] = useState(false);
  const [Is_Loading_Searched_List, Set_Is_Loading_Searched_List] = useState(false);
  const [Search_Query, Set_Search_Query] = useState();
  const [Searched_List, Set_Searched_List] = useState(null);
  const [Budget_List, Set_Budget_List] = useState(null);

  const [Current_Pageno, Set_Current_Pageno] = useState(1);
  const [Page_Item_Amount, Set_Page_Item_Amount] = useState(10);
  const [Results_Available, Set_Results_Available] = useState(0);

  const [Selected_Range, Set_selectedRange] = useState(1);
  const [New_Page_Item_Amount, Set_New_Page_Item_Amount] = useState(10);
  const [Search_Keyword, Set_Search_Keyword] = useState("");
  const [Selected_Budget, Set_Selected_Budget] = useState("");
  const [Is_Checked_Private_Room, Set_Is_Checked_Private_Room] = useState(false);
  const [Is_Checked_Parking, Set_Is_Checked_Parking] = useState(false);
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

  const Is_Loading = () => {
    return Latitude_Data === null || Longitude_Data === null || Is_Loading_Searched_List;
  }

  const Search_Shop = (Refresh) => {
    Set_Is_Loaded_Searched_List(false);
    Set_Is_Loading_Searched_List(true);
    let Post_Search_Query;
    if(Refresh){
      Set_Page_Item_Amount(New_Page_Item_Amount);
      Post_Search_Query={
        Latitude: Latitude_Data,
        Longitude: Longitude_Data,
        Range: Selected_Range,
        Budget: Selected_Budget,
        Current_Pageno: Current_Pageno,
        Page_Item_Amount: New_Page_Item_Amount,
        Keyword: Search_Keyword,
        Private_Room: Is_Checked_Private_Room? 1 : 0,
        Parking: Is_Checked_Parking? 1 : 0,
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
      Set_Is_Loading_Searched_List(false);
      try{
        sessionStorage.setItem('Searched_List', JSON.stringify(response.data.shop));
        sessionStorage.setItem('Search_Query', JSON.stringify(Post_Search_Query));
        sessionStorage.setItem('Results_Available', response.data.results_available);
      }catch{

      }
      if(Refresh){
        Set_Current_Pageno(1);
      }
    })
    .catch(function () {
      alert("店舗一覧の取得に失敗しました。");
      Set_Is_Loading_Searched_List(false);
    });
  };

  const Load_Budget_List = (Refresh) => {
    axios_instance
    .post('/budget_list')
    .then(function (response) {
      Set_Budget_List(response.data.budget);
      sessionStorage.setItem('Budget_List', JSON.stringify(response.data.budget));
    })
    .catch(function () {
      //alert("料金一覧の取得に失敗しました。");
    });
  };
  
  useEffect(() => {
    try{
      let storage_query;
      if (sessionStorage.getItem("Searched_List")) {
        Set_Searched_List(JSON.parse(sessionStorage.getItem("Searched_List")));
        Set_Is_Loaded_Searched_List(true);
      }
      if (sessionStorage.getItem("Search_Query")) {
        storage_query=JSON.parse(sessionStorage.getItem("Search_Query"));
        Set_Search_Query(storage_query);

        Set_Current_Pageno(storage_query.Current_Pageno);
        Set_Page_Item_Amount(storage_query.Page_Item_Amount);
        Set_New_Page_Item_Amount(storage_query.Page_Item_Amount);
      
        Set_selectedRange(storage_query.Range);
        Set_Search_Keyword(storage_query.Keyword);
        Set_Is_Checked_Private_Room(storage_query.Private_Room);
        Set_Is_Checked_Parking(storage_query.Parking);
        Set_Is_Checked_Lunch(storage_query.Lunch);
        Set_Is_Checked_Midnight_Meal(storage_query.Midnight_Meal);
      }
      if(sessionStorage.getItem("Results_Available")){
        Set_Results_Available(sessionStorage.getItem("Results_Available"));
      }
      if (sessionStorage.getItem("Latitude_Data")) {
        Set_Latitude_Data(sessionStorage.getItem("Latitude_Data"));
      }
      if (sessionStorage.getItem("Longitude_Data")) {
        Set_Longitude_Data(sessionStorage.getItem("Longitude_Data"));
      }
      if (sessionStorage.getItem("Budget_List")) {
        Set_Budget_List(JSON.parse(sessionStorage.getItem("Budget_List")));
        Set_Selected_Budget(storage_query);
      }
    }catch{
      
    }
    Load_Budget_List();
  },[]);

  useEffect(() => {
    if(navigator.geolocation){
      Set_Is_Supported_Geolocation(true);
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        Set_Latitude_Data(latitude);
        Set_Longitude_Data(longitude);
        try {
          sessionStorage.setItem('Latitude_Data', latitude);
          sessionStorage.setItem('Longitude_Data', longitude);
        }catch{

        }
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

      
      <StyledHeader>
        <StyledAppTitle>飲食店検索システム</StyledAppTitle>
      </StyledHeader>
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
        <StyledSearchAreaLabel htmlFor="parking">
          駐車場あり:
        <input
          type="checkbox"
          id="parking"
          checked={Is_Checked_Parking}
          onChange={() => Set_Is_Checked_Parking(prevState => !prevState)}
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

      <StyledSearchAreaTopic>予算:</StyledSearchAreaTopic>
        ディナー予算:
        <StyledSearchAreaLabel>
            {Budget_List ? <select
              value={Selected_Budget}
              onChange={e => Set_Selected_Budget(e.target.value)}
            >
              <option value="">任意</option>
              {Budget_List.map((item,index) => {
                return (
                  <option value={item.code} key={index}>{item.name}</option>
                );
              })}
            </select> 
            : 
            <>任意(読み込み中...)</>
            }
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
              disabled={Is_Loading()}
        >{Is_Loading() ? "ロード中…": "検索"}</StyledSearchButton>
      </div>

    {Searched_List &&
      <>
        <PagingComponent
          Set_Current_Pageno={Set_Current_Pageno}
          Current_Pageno={Current_Pageno}
          Results_Available={Results_Available}
          Page_Item_Amount={Page_Item_Amount}
          Is_Loaded_Searched_List={Is_Loaded_Searched_List}
        />
        {Results_Available >= 1 ? 
          <ShopList
            shop_items={Searched_List}
          />
          :
          <StyledNoMatchText>該当結果なし</StyledNoMatchText>
        }
        <PagingComponent
          Set_Current_Pageno={Set_Current_Pageno}
          Current_Pageno={Current_Pageno}
          Results_Available={Results_Available}
          Page_Item_Amount={Page_Item_Amount}
          Is_Loaded_Searched_List={Is_Loaded_Searched_List}
        />
      </>
     }
    </div>
  );


}

const StyledAppTitle = styled.h1`
  font-size: 30px;
  margin: 0px;
  color: white;
  padding: 0px;
`;

const StyledSearchButton = styled(StyledCommonButton)`
  width:200px;
  height:50px;
  font-size: 20px;
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

const StyledNoMatchText = styled.h2`
  font-size: 30px;
`;



export default Search;
