import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './search.module.css'

export default function Search() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  function changeSearchValue(event) {
    setSearchValue(event.target.value)
  }

  function submit(event) {
    event.preventDefault()
    router.push(`/?search=${searchValue}`)
  }

  return (
    <div>
      <h2>Search for a specific post:</h2>
      <form onSubmit={submit} className={styles['search-form']}>
        <input
          type="text"
          value={searchValue}
          onChange={changeSearchValue}
          className={styles['text-input']}
        />
        <button type="submit" className={styles['search-button']}>
          search
        </button>
      </form>
    </div>
  )
}
