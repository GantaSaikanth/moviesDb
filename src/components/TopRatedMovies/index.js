import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import MoviesCard from '../MoviesCard'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class TopRatedMovies extends Component {
  state = {moviesDB: [], apiStatus: apiConstraints.initial}

  componentDidMount() {
    this.TopRatedMovies()
  }

  TopRatedMovies = async () => {
    this.setState({apiStatus: apiConstraints.inProgress})

    const myApiKey = 'edf766945e7a7644d5d45f7bb5608f33'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${myApiKey}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()

    const updatedData = data.results.map(each => ({
      id: each.id,
      title: each.title,
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
      <div className="movies-containers">
        <h1>Top Rated Movies</h1>
        <ul className="list-of-moviess">
          {moviesDB.map(each => (
            <MoviesCard key={each.id} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderTopMovies = () => {
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
    return (
      <div className="home-container">
        <Navbar />
        {this.renderTopMovies()}
      </div>
    )
  }
}

export default TopRatedMovies
