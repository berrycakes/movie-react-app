import React, { useState, useEffect } from 'react'
const apiKey = process.env.REACT_APP_OMDB_API_KEY

const MovieDetails = ({ id, handleModalClick }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    if (id) {
      const urlMovieId = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      fetch(urlMovieId)
        .then((response) => response.json())
        .then((data) => {
          setDetails(data)
          console.log(data.Genre)
        })
    }
  }, [id])

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
