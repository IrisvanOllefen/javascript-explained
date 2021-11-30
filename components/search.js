import { useState } from 'react'

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState('')

    function changeSearchValue(event) {
        setSearchValue(event.target.value)
    }

    function submit(event) {
        event.preventDefault()
        props.onSubmit(searchValue)
    }

    return (
        <form onSubmit={submit}>
        <input type="text" value={searchValue} onChange={changeSearchValue}/>
        <button type="submit">add</button>
      </form>
    )
}