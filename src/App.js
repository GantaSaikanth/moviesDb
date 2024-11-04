import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovies from './components/SingleMovies'
import SearchOfMovies from './components/SearchOfMovies'

import SearchMoviesContent from './context/SearchMoviesContent'

import './App.css'

// write your code here
class App extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = text => {
    this.setState({searchInput: text})
  }

  render() {
    const {searchInput} = this.state

    return (
      <SearchMoviesContent.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movies/:id" component={SingleMovies} />
          <Route exact path="/search" component={SearchOfMovies} />
        </Switch>
      </SearchMoviesContent.Provider>
    )
  }
}

export default App
