import React from "react";
import wind from "../images/wind.png"
import pressure from "../images/pressure.png"
import humidity from "../images/humidity.png"
import feelsLike from "../images/feels-like.png"
import axios from 'axios'
import bot from "../images/bot.png"


export default function WeatherPage(){

const [weatherData, setWeatherData] = React.useState([{}])
const [location,setLocation] = React.useState("saida")

React.useEffect(() => { 
 fetch( `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d8fcbd1f6d9ddd7f8b6487afb7f5f0aa&units=metric`)
 .then((respone) => respone.json())
 .then( (data) => {
  setWeatherData(data)
})

}, [])
console.log(weatherData)
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

//  convert unix to local time 
 var newDate = weatherData.dt
 var date = new Date (newDate * 1000)
 var realDate =  date.toLocaleDateString("en-US", {day : "numeric", month:"long", year:"numeric"})

 // change location
 function Location(event){
  setLocation(prevstate =>{
    return {
      ...prevstate, [event.target.name]:event.target.value
    }
  })
 }


    return(
      <div className="container">
      <div className="card">
      </div>
      <input 
             className="input"
             value = {location}
             onChange= {event => setLocation(event.target.value)}
             onKeyPress={searchLocation}       
             type= 'text'
             placeholder="Enter Location"
             
               /> 
      <h1 className="city">{weatherData.name}</h1>
      { weatherData.coord ? <h1 className="cords-lon"> Lon: {weatherData.coord.lon} </h1> : null}
      { weatherData.coord ? <h1 className="cords-lat">Lat: {weatherData.coord.lat} </h1> : null}
     
      <img className="time" src={bot} alt="Logo" />
      <h1 className="date"> {realDate} </h1>
      { weatherData.weather ? <img className="img" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}  alt="Logo" /> : null}
       {weatherData.main ? <h1 className="temp"> {weatherData.main.temp}C</h1> : null } 
      { weatherData.weather ? <h1 className="description">{weatherData.weather[0].description}</h1>: null}
      <div className="details-container" >
      <img className="img-feelsLike" src={feelsLike} alt="Logo" />
      { weatherData.main ? <h1 className="temp-now"> Feels like: {weatherData.main.feels_like}</h1> : null}
      <img className="img-wind" src={wind} alt="Logo" />
      { weatherData.wind ? <h1 className="wind-speed"> Wind speed: {weatherData.wind.speed} </h1> : null}
      <img className="img-pressure" src={pressure} alt="Logo" />
      { weatherData.main ? <h1 className="pressure-value"> Pressure: {weatherData.main.pressure} </h1> : null}
      <img className="img-humidity" src={humidity} alt="Logo" />
      { weatherData.main ? <h1 className="humidity-value"> Humidity: {weatherData.main.humidity} </h1>:null}
      </div>


      
     

      </div>
    )
}

