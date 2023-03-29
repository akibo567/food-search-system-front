
import React, { useState, useEffect } from "react";

function Search() {
  const [Latitude_Data, Set_Latitude_Data] = useState();
  const [Longitude_Data, Set_Longitude_Data] = useState();
  
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
     いいいいい
     latitude:{Latitude_Data}
     Longitude:{Longitude_Data}
    </div>
  );
}

export default Search;
