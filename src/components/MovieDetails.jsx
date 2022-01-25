import React, { useState, useEffect } from 'react'
import { getMovieDetails } from './utils/getMovieDetails'

const MovieDetails = ({ id, handleModalClick }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const data = await getMovieDetails(id)
        try {
          setDetails(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetch()
  })

  return (
    <div className={'movie-details'} onClick={handleModalClick}>
      {details ? (
        <div className="movie-details-content">
          <img
            src={details.Poster}
            alt={details.Title}
            className="details-poster"
          />
          <div className="details-text">
            <div className="details details-title">{details.Title}</div>
            <div className="details">{details.Year}</div>
            <div className="details">{details.Actors}</div>
            <div className="details">{details.Runtime}</div>
            <div className="details details-plot">{details.Plot}</div>
            <div className="details">{details.Genre}</div>
            <div className="icons-container">
              <div className="details details-rating">{details.imdbRating}</div>
            </div>
          </div>
        </div>
      ) : (
        'loading'
      )}
    </div>
  )
}

export default MovieDetails
