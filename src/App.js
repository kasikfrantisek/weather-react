import React from "react";
import { useState, useEffect } from "react";
import Daily from './components/Daily';
import './App.css';
import SearchForm from "./components/SearchForm";
import Modal from './components/Modal'

function App() {

  const [data, setData] = useState()
  const [city, setCity] = useState('Prague')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [clicked, setClicked] = useState(false)
  const [tileIndex, setTileIndex] = useState();
    const click = (e) => {
         setClicked(current => !current)
         setTileIndex(Number(e.target.id))
    }

  useEffect(() => {
      fetch( `https://api.weatherapi.com/v1/forecast.json?key=ecfafe3bb89d4f8fb8c134243230501&q=${city}&days=7&aqi=no&alerts=no`)
      .then(res => {
          if(res.ok) {
            return res.json()}
          throw res;
      })
      .then(data => {
        setData(data)
        console.log(data)
        setClicked(false)
      })
      .catch(err => {
          setError(err)
      })
      .finally(() => setLoading(false))
     
    }, [city]);

  const changeCity = (e) => {
    setError()
    e.preventDefault()
    setCity(e.target.newCity.value)
  }

  const checkHours = () => {
    const current = new Date().getHours()
    const sunsetString = data.forecast.forecastday[0].astro.sunset
    const sunset = Number(sunsetString.substring(0, sunsetString.indexOf(':'))) + 12;
    const sunriseString = data.forecast.forecastday[0].astro.sunrise;
    const sunrise = Number(sunriseString.substring(0, sunriseString.indexOf(':')));
    console.log(sunset, sunrise ,current)

if((sunrise - 1 <= current && current <= sunrise + 1) || (sunset - 1 <= current && current <= sunset + 1)){
    return 'sunset_rise'
    } else if (sunset + 1 < current || current < sunrise - 1){
      return 'night'
    } 
     else if (sunrise + 1 < current < sunset - 1){
      console.log(true)
      return 'day' }
  }


  if(loading) return (
    <div className="App noResult">
    <h1>Loading...</h1>
    </div>
  ) 

  

  if(error) return (
    <div className="App noResult">
    <SearchForm fun={changeCity} />
    <div className="err">
      <h1>Enter different city</h1>
    </div>
    </div>
  )

  return (
    <div className={checkHours() + ' App'}>
    <div className="main-info">

    <div className="place">
      <h2>{data.location.name}</h2>
      <h3>{data.location.region}</h3>
      <h4>{new Date(data.location.localtime).toLocaleDateString()}</h4>
    </div>
    <SearchForm fn={changeCity} />
    <div className="current">
      <h4>Current temp: {data.current.temp_c}°C</h4>
      <h4>Feels like: {data.current.feelslike_c}°C</h4>
      <img src={data.current.condition.icon} alt={data.current.condition.text}></img>
    </div>
    </div>
    
    {!clicked ? (<div className='container'>
      {data.forecast.forecastday.map((day, index) => 
      <Daily id={index} key={index} dayData={day} fn={click} />)}
    </div>) : (
    <Modal fn={click} data={data.forecast.forecastday[tileIndex]}/>)}
    </div>
  )
}

export default App;
