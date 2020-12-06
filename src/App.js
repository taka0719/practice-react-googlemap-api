import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [hasLoadDone, setHasLoadDone] = useState(false);

  const handleGetLatAndLng = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${API_KEY}`;
      const latAndLng = await axios.get(url);
      setHasLoadDone(true);
      console.log(latAndLng);
      const results = latAndLng.data.results[0];
      setAddress(results.formatted_address)
      const location = results.geometry.location;
      setLat(location.lat);
      setLng(location.lng);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => setPlace(e.target.value);

  return (
    <>
      <h1 className="app-title">地名検索</h1>
      <p>地名を入力</p>
      <input type="text" value={place} onChange={handleChange} />
      <input
        type="button"
        value="緯度・経度を検索"
        onClick={handleGetLatAndLng}
      />
      {hasLoadDone ? (
        <div>
          <div> {address} </div>
          <p> 緯度: {lat} </p>
          <p> 経度: {lng} </p>
        </div>
      ) : (
        <div>{place}</div>
      )}
    </>
  );
};

export default App;
