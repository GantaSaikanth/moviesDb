import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class SearchedMovies extends Component {
  state = {moviesDB: [], apiStatus: apiConstraints.initial}

  componentDidMount() {
    this.getSearchedMovies()
  }

  getSearchedMovies = async searchInput => {
    this.setState({apiStatus: apiConstraints.inProgress})

    const myApiKey = 'edf766945e7a7644d5d45f7bb5608f33'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${myApiKey}&language=en-US&query=${searchInput}&page=1`
    const response = await fetch(url)
    const data = await response.json()

    const updatedData = data.results.map(each => ({
      id: each.id,
      title: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterPath: each.poster_path,
      releaseDate: each.release_date,
      voteAverage: each.vote_average,
      voteCount: each.vote_count,
    }))

    this.setState({
      moviesDB: updatedData,
      apiStatus: apiConstraints.success,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => {
    const {moviesDB} = this.state
    console.log(moviesDB)

    return (
      <div className="movies-container">
        <ul className="list-of-movies">
          {moviesDB.map(each => {
            const {
              id,
              title,
              overview,
              popularity,
              posterPath,
              releaseDate,
              voteAverage,
              voteCount,
            } = each
            const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`

            return (
              <li key={id} className="movies">
                <img src={imageUrl} alt={title} className="images" />
                <div className="details">
                  <h1 className="head-title">{title}</h1>
                  <p className="overview">Overview: {overview}</p>
                  <p className="popular">Popularity: {popularity}</p>
                  <p className="release-date">Release Date: {releaseDate}</p>
                  <p>
                    Votes: {voteAverage} VoteCount: {voteCount}
                  </p>
                  <Link className="linsk" to={`/movies/${id}`}>
                    <button className="buttons" type="button">
                      View Details
                    </button>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstraints.inProgress:
        return this.renderLoader()
      case apiConstraints.success:
        return this.renderSuccessPage()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderMovies()}</div>
  }
}

export default SearchedMovies
