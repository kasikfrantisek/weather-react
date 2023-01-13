import React from 'react'
import styles from  '../styles/Search.module.css'

function SearchForm(props) {
  return (
    <div className={styles.search}>
      <h3>Search for different city</h3>
    <form onSubmit={props.fn} className={styles.form}>
      <input name="newCity" type='text' required placeholder="Insert city" />
      <button type="submit">Search city</button>
    </form>
    </div>
  )
}

export default SearchForm