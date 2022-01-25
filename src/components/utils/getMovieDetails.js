const apiKey = process.env.REACT_APP_OMDB_API_KEY

async function getMovieDetails(id) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('fetch error')
  }
}

export { getMovieDetails }
