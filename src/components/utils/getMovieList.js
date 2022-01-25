const apiKey = process.env.REACT_APP_OMDB_API_KEY

async function getMovieList(query) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}/&apikey=${apiKey}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('fetch error')
  }
}

export { getMovieList }
