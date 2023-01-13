import React from 'react'
import styles from '../styles/Modal.module.css'
import Hourly from './Hourly'

function Modal({fn, data}) {
  return (
    <>
    <button className={styles.modalBtn} onClick={fn}>Back to daily forecast</button>
    <div className={styles.modal}>
    {data.hour.map((hour, index) => <Hourly key={index} data={hour} />)}
    </div>
    </>
  )
}

export default Modal