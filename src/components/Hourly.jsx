import React from 'react'
import styles from '../styles/Card.module.css'

function Hourly({data}) {
    const time = new Date(data.time)
    const currentTimeStamp = new Date().getTime()
  return  currentTimeStamp < time.getTime() && (
    <div className={styles.container}>
    <h4>{time.getHours() + ':00'}</h4>
    <p>{data.temp_c}°C</p>
    <p>Feels like: {data.feelslike_c}°C</p>
    <p>Chance of rain: {data.chance_of_rain}%</p>
    <p>Humidity: {data.humidity}%</p>
    <p>Wind speed: {data.wind_kph} km/h</p>
    <img src={data.condition.icon} alt={data.condition.text}></img>
    </div>
  )
}

export default Hourly