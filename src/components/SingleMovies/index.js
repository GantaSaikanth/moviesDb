import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Navbar from '../Navbar'

import CastOfMovies from '../CastOfMovies'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class SingleMovies extends Component {
  state = {singleMovieDb: {}, apiStatus: apiConstraints.initial}

  componentDidMount() {
    this.getSingleMovies()
  }

  getSingleMovies = async () => {
    this.setState({apiStatus: apiConstraints.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const myApiKey = 'edf766945e7a7644d5d45f7bb5608f33'

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${myApiKey}&language=en-US`,
    )
    const data = await response.json()

    const updatedData = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      budget: data.budget,
      genresId: data.genres,
      homePage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      originalCountry: data.origin_country,
      originalLanguage: data.original_language,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }

    this.setState({
      singleMovieDb: updatedData,
      apiStatus: apiConstraints.success,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => {
    const {singleMovieDb} = this.state
    console.log(singleMovieDb)
    const {
      budget,
      homePage,
      id,
      originalLanguage,
      overview,
      popularity,
      posterPath,
      releaseDate,
      status,
      tagline,
      title,
      voteAverage,
      voteCount,
    } = singleMovieDb
    const imageForMovie = `https://image.tmdb.org/t/p/w500${posterPath}`

    return (
      <>
        <div className="single-movies">
          <img src={imageForMovie} alt={title} className="image-movie" />
          <div className="details-page">
            <h1>
              {title} <br /> {tagline}
            </h1>
            <Link to={homePage}>
              <p>{homePage}</p>
            </Link>
            <p>Overview: {overview}</p>
            <p>Popularity: {popularity.toFixed(1)}</p>
            <p>Status: {status}</p>
            <p>Release Date: {releaseDate}</p>
            <p>Original Language: {originalLanguage.toUpperCase()}</p>
            <p>Budget: {budget}</p>

            <p>Vote Average: {voteAverage}</p>
            <p>VoteCount: {voteCount}</p>
          </div>
        </div>
        <h1>Cast</h1>
        <ul className="list-of-castsss">
          <CastOfMovies movieId={id} />
        </ul>
      </>
    )
  }

  renderSingleMovieS = () => {
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
      <div>
        <Navbar />
        {this.renderSingleMovieS()}
      </div>
    )
  }
}

export default SingleMovies
