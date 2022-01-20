import React, { useState } from 'react'

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
    // input.trim() ? addInput({ input }) : null
  }

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="input"
          placeholder="Spider man"
          onChange={handleChangeInput}
          value={input}
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
