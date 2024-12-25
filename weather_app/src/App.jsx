import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case "mist":
        return "https://cdn.pixabay.com/photo/2016/11/22/19/10/clouds-1850093_640.jpg";
      case "clouds":
        return "https://cdn.pixabay.com/photo/2022/03/28/10/06/mountain-7097104_640.jpg";
      case "clear":
        return "https://cdn.pixabay.com/photo/2020/02/04/03/50/sky-4817252_640.jpg";
      case "rain":
        return "https://cdn.pixabay.com/photo/2018/07/05/18/58/rain-3518956_640.jpg";
      case "broken clouds":
        return "https://cdn.pixabay.com/photo/2021/12/13/14/57/trees-6868446_640.jpg";
      case "scattered clouds":
        return "https://cdn.pixabay.com/photo/2018/01/23/23/34/nature-3102762_640.jpg";
      case "smoke":
        return "https://cdn.pixabay.com/photo/2020/10/28/19/18/cloud-5694354_640.jpg";
      case "haze":
        return "https://cdn.pixabay.com/photo/2019/06/09/10/58/mountains-4261864_640.jpg";
      default:
        return "https://cdn.pixabay.com/photo/2023/10/28/09/20/darling-8346954_640.jpg";
    }
  };

  const fetchWeather = async () => {
    const apiKey = "b20a302b80c08d6bb5bb69caa3dc0302";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);


        const bgImage = getBackgroundImage(data.weather[0].main);
        setBackgroundImage(bgImage);
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", textShadow: "2px 2px 5px black" }}>
        Weather App
      </h1>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <h2 style={{ color: "#FFD700", fontSize: "1.5rem", fontWeight: "bold" }}>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>
            <span style={{ color: "#ADD8E6" }}>Temperature:</span> {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>
            <span style={{ color: "#90EE90" }}>Condition:</span> {weatherData.weather[0].description}
          </p>
          <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>
            <span style={{ color: "#FF6347" }}>Humidity:</span> {weatherData.main.humidity}%
          </p>
          <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>
            <span style={{ color: "#FFA500" }}>Wind Speed:</span> {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;