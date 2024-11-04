import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CastOfMovies extends Component {
  state = {castDB: {}, apiStatus: apiConstraints.initial}

  componentDidMount() {
    this.getCastOfMovies()
  }

  getCastOfMovies = async () => {
    this.setState({apiStatus: apiConstraints.inProgress})
    const {movieId} = this.props
    console.log(movieId)
    const myApiKey = 'edf766945e7a7644d5d45f7bb5608f33'

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${myApiKey}&language=en-US`,
    )
    const data = await response.json()

    const updatedData = data.cast.map(each => ({
      adult: each.adult,
      gender: each.gender,
      id: each.id,
      knownForDepartment: each.known_for_department,
      name: each.name,
      orginalName: each.original_name,
      popularity: each.popularity,
      profilePath: each.profile_path,
      castId: each.cast_id,
      character: each.character,
      order: each.order,
    }))

    this.setState({
      castDB: updatedData,
      apiStatus: apiConstraints.success,
    })
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => {
    const {castDB} = this.state

    return (
      <>
        {castDB.map(each => {
          const {
            id,
            knownForDepartment,
            name,
            orginalName,
            profilePath,
            character,
          } = each
          const imageOfCast = `https://image.tmdb.org/t/p/w500/${profilePath}`

          return (
            <li key={id} className="cast-div">
              <img className="cast-image" src={imageOfCast} alt={name} />
              <div className="details-of-cast">
                <h1>{name}</h1>
                <p>{orginalName}</p>
                <p>Character Name: {character}</p>
                <p>{knownForDepartment}</p>
              </div>
            </li>
          )
        })}
      </>
    )
  }

  renderFailurePage = () => (
    <div>
      <h1>Failed to provide details of cast</h1>
    </div>
  )

  renderCast = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstraints.inProgress:
        return this.renderLoader()
      case apiConstraints.success:
        return this.renderSuccessPage()
      case apiConstraints.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCast()}</div>
  }
}

export default CastOfMovies
