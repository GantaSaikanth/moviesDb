import {Link} from 'react-router-dom'

import './index.css'

const MoviesCard = props => {
  const {movieDetails} = props
  const {
    id,
    title,
    overview,
    popularity,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
  } = movieDetails
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <li key={id} className="moviess">
      <img src={imageUrl} alt={title} className="imagess" />
      <div className="detailss">
        <h1 className="head-titles">{title}</h1>
        <p className="overviews">Overview: {overview}</p>
        <p className="populars">Popularity: {popularity}</p>
        <p className="release-dates">Release Date: {releaseDate}</p>
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
}

export default MoviesCard
