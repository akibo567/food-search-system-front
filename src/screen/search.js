
import React, { useState, useEffect } from "react";
import ShopList from "../components/shop_list"

function Search() {
  const [Latitude_Data, Set_Latitude_Data] = useState();
  const [Longitude_Data, Set_Longitude_Data] = useState();

  const [Searched_List, Set_Searched_List] = useState([{}]);


  const Search_Button_Onclick = () => {
    Set_Searched_List(
      [
        {
          name:"ダミー1",
          acccess:"HOGEから徒歩一分",
          thumb_img:"hoge.jpg",
          location:"A町B市",
          business_hour:"8:00~18:00",
        },
        {
          name:"ダミー2",
          acccess:"HOGEから徒歩一分",
          thumb_img:"hoge.jpg",
          location:"A町B市",
          business_hour:"8:00~18:00",
        },
        {
          name:"ダミー3",
          acccess:"HOGEから徒歩一分",
          thumb_img:"hoge.jpg",
          location:"A町B市",
          business_hour:"8:00~18:00",
        },
        {
          name:"ダミー4",
          acccess:"HOGEから徒歩一分",
          thumb_img:"fuga.jpg",
          location:"市",
          business_hour:"18:00",
        }
      ],
    );
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
     <ShopList
        shop_items={Searched_List}
     />
    </div>
  );
}

export default Search;
