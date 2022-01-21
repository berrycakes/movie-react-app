import React from 'react'
import { FaStar } from 'react-icons/fa'

const Movies = ({
  title,
  poster,
  year,
  id,
  handleMovieClick,
  handleStarClick,
  watchList,
}) => {
  return (
    <div className="movie-container">
      <div className="movies">
        <div
          className={
            watchList.find((item) => item.id === id)
              ? 'details star-button-active'
              : 'details star-button'
          }
          onClick={() => handleStarClick(id, title)}
        >
          <FaStar />
        </div>
        <img
          className="poster-container"
          src={poster}
          alt={title}
          onClick={() => handleMovieClick(id)}
        />
        <div
          className="title-container"
          title="movie-title-container"
          onClick={() => handleMovieClick(id)}
        >
          {title}
        </div>
        <div className="year-container" onClick={() => handleMovieClick(id)}>
          {year}
        </div>
      </div>
    </div>
  )
}

export default Movies
