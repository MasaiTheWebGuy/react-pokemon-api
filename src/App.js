import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import Style from './style.css'
import axios from 'axios'

/*res.data is data from the API once its connected .then() I can come with the
  define destructory with useState
  useEffect works as my Mounting/DidMount lifecycle. I created states and UseEffect
  handles the state if anything changes

  axios helps me fetch apis
  tachyons helps me align like Bootstrap. There is a link I can follow to get to know it better


  calling state is like calling a function. 
  
  first parameter is the default
  2nd parameter is what can change the state
  this is mainly done on the <App />

*/

function App() {

  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setcurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageURL, setNextPageURL] = useState()
  const [prevPageURL, setPrevPageURL] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageURL(res.data.next)
      setPrevPageURL(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })


    return () => cancel()
  }, [currentPageUrl])


  function goToNextPage(){

    setcurrentPageUrl(nextPageURL)
  }

  function gotoPrevPage(){
    setcurrentPageUrl(prevPageURL)
  }

  if (loading) return "Loading..."

 

  return (
    <>
    <PokemonList pokemon ={ pokemon } />
    <Pagination
      goToNextPage={nextPageURL ? goToNextPage : null}
      gotoPrevPage={prevPageURL ? gotoPrevPage : null}
    />
    </>
  );
}

export default App;
