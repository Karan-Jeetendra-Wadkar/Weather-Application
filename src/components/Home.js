import React, { useEffect, useState } from "react";
import axios from 'axios'

const Home = () => {

    const[data, setData] = useState({

        celcius: 16,
        name: 'London',
        humidity: 12,
        speed: 2,
        image: "/image/cloud.png"

    })

  const [name, setName] = useState("");
  const [error,setError] = useState("");


    const search = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a6819dfc4929a5ab98b78ac0412bffe3&unit=metric`
            axios.get(apiUrl)
            .then(res => {
                let imagePath = "";
                if(res.data.weather[0].main == "Clouds"){
                    imagePath = "/image/cloud.png"
                }else if(res.data.weather[0].main == "Clear"){
                    imagePath = "/image/clear.png"
                }else if(res.data.weather[0].main == "Rain"){
                    imagePath = "/image/rain.png"
                }else if(res.data.weather[0].main == "Drizzle"){
                    imagePath = "/image/drizzle.png"
                }else if(res.data.weather[0].main == "Mist"){
                    imagePath = "/image/mist.png"
                }else{
                    imagePath = "/image/cloud.png"
                }

               
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image:imagePath})
                setError("")

            }
            )
    
            .catch(  err => {
                
                if(err.response.status == 404){
                    setError("Invalid City Name!")
                }else{
                    setError("")
                }
                console.log(err)});
        }
    }


  return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter City Name" />
                <button onClick={search}><img src="/image/search.png" width={34} height={34} /> </button>
            </div>
            <div className="error"><p>{error}</p></div>
            <div className="winfo">
                
                <img src={data.image} />
                <h1>{data.celcius}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src="/image/humidity.png" alt="" />
                        <div>
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src="/image/wind.png" />
                        <div>
                            <p>{data.speed}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
)
};

export default Home;
