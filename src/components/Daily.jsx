import React from 'react'
import styles from '../styles/Card.module.css'

function Daily({dayData, fn, id}) {
    
    const transformedDate = new Date(dayData.date).toLocaleDateString();
   
return (
    <div className={styles.container}  >
        <h4>{transformedDate}</h4>
        <p>Min temp.: {dayData.day.mintemp_c} °C</p>
        <p>Max temp.: {dayData.day.maxtemp_c} °C</p>
        <p>Avg temp.: {dayData.day.avgtemp_c} °C</p>
        <p>Chance of rain: {dayData.day.daily_chance_of_rain}%</p>
        <img src={dayData.day.condition.icon} alt={dayData.day.condition.text}></img>
        <button onClick={fn} id={id}>Hourly forecast</button>
    </div>
  )
}

export default Daily