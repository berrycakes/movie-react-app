import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Watchlist = ({ watchList }) => {
  const [isWatchlistVisible, setWatchlistVisible] = useState(false)

  return (
    <div className="watchlist">
      <div
        className="watchlist-button"
        onClick={() => setWatchlistVisible(true)}
      >
        <FaStar /> watchList
      </div>
      {isWatchlistVisible ? (
        <div
          className="watchlist-content"
          onClick={() => setWatchlistVisible(false)}
        >
          <h2>My Watch list</h2>
          <li className="watchlist-card">
            {watchList && watchList.length > 0 ? (
              watchList.map((movie, index) => (
                <ul className="watchlist-item" key={index}>
                  {movie.title}
                </ul>
              ))
            ) : (
              <ul>Nothing on your watch list</ul>
            )}
          </li>
        </div>
      ) : null}
    </div>
  )
}

export default Watchlist
