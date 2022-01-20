import React from 'react'
import { FaStar } from 'react-icons/fa'

const Movies = ({ title, poster, year, id, handleMovieClick }) => {
  return (
    <div className="movie-container" onClick={() => handleMovieClick(id)}>
      <div className="movies">
        <div className="details star-button">
          <FaStar />
        </div>
        <img className="poster-container" src={poster} alt={title} />
        <div className="title-container">{title}</div>
        <div className="year-container">{year}</div>
      </div>
    </div>
  )
}

export default Movies
