import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ addInput }) => {
  const [input, setInput] = useState('')

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      addInput(input)
    }
  }

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <input
          title="searchBar"
          className="search-input"
          type="text"
          name="input"
          placeholder="Search by movie title"
          onChange={handleChangeInput}
          value={input}
        />
        <button className="submit-button" type="submit" title="submit-button">
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
