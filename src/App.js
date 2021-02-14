import React,{useState,useEffect} from 'react'
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination'
function App() {
  
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl,setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl,setNextPageUrl] = useState()
  const [prevPageUrl,setprevPageUrl] = useState()
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
    .get(currentPageUrl,{
    cancelToken:new axios.CancelToken(c => cancel = c)})
    .then(result =>{
      setLoading(false)
      setNextPageUrl(result.data.next)
      setprevPageUrl(result.data.previous)
      setPokemon(result.data.results.map(p => p.name) )
    })
    return () => {cancel()}
},[currentPageUrl])

function gotoNextPage(){
  setCurrentPageUrl(nextPageUrl)
}

function gotoPrevPage(){
  setCurrentPageUrl(prevPageUrl)
}

if(loading) return "Loading Pokemons!!!"

  return (
    <>
 <PokemonList pokemon={pokemon}/>
 <Pagination 
      gotoNextPage={nextPageUrl ? gotoNextPage : null} 
      gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
 </>
  );
}

export default App;
