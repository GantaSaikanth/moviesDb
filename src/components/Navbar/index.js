import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import MoviesCard from '../MoviesCard'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Navbar extends Component {
  state = {
    moviesDatabase: [],
    searchInput: '',
    apiStatus: apiConstraints.initial,
  }

  onClickSearch = async () => {
    this.setState({apiStatus: apiConstraints.inProgress})
    const {searchInput} = this.state

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
      moviesDatabase: updatedData,
      apiStatus: apiConstraints.success,
    })
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => {
    const {moviesDatabase} = this.state

    return (
      <div className="search-movies-container movies-container">
        <h1 className="heading">Search Result</h1>
        <ul className="movies-list-container">
          {moviesDatabase.map(each => (
            <MoviesCard key={`details${each.id}`} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderDifferentPage = () => {
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
    const {searchInput, moviesDatabase} = this.state

    return (
      <>
        <div className="header">
          <Link className="heading" to="/">
            <h1>movieDB</h1>
          </Link>
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={this.onChangeInput}
              className="input"
              placeholder="Search"
            />
            <button
              type="button"
              className="label"
              onClick={this.onClickSearch}
            >
              Search
            </button>
          </div>
          <div>
            <Link className="links" to="/">
              Home
            </Link>
            <Link className="links" to="/top-rated">
              Top Rated
            </Link>
            <Link className="links" to="/upcoming">
              Upcoming
            </Link>
          </div>
        </div>
        {moviesDatabase.length > 1 ? this.renderDifferentPage() : ''}
      </>
    )
  }
}

export default withRouter(Navbar)
