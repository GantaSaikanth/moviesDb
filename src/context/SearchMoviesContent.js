import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchResponse: {},
  onTriggerSearching: () => {},
})

export default SearchMoviesContext
