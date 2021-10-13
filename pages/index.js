import Head from 'next/head'
import styles from '../styles/Home.module.css'

import useSWR from 'swr'
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json())

export const getStaticProps = async () =>{
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await res.json();
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return{
    props: { data }
  }
}


export default function Home({ data }) {
  const [searchTerm, setSearchTerm]=useState('');
  const [filteredPokemon, setFilteredPokemon]=useState('');

  const filterPokemon = (textToSearch) =>{
    const allPokemon=data.results;
    const newPokemon= allPokemon.filter((pokemon) => {if(pokemon.name.toLowerCase().includes(textToSearch.toLowerCase())) return pokemon} )
      setFilteredPokemon(newPokemon);
     
      // console.log(textToSearch)
      console.log(filteredPokemon)
     
  }


  const GetImage=(url)=>{    
    const { data, error } = useSWR(url, fetcher) //to get the images
        if (error) return <div>failed to load</div>
        if (!data) return <div>loading...</div>
        {/* if(!error && data) */}
        return ( 
         <img key={url} src={data.sprites.front_default} alt={data.sprites.front_default} />
        )
  }

    const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterPokemon(searchTerm);
    // console.log(filteredPokemon);
    // console.log({searchTerm})
  }
 const Display = ({data}) =>{
   if(!{data}){
     return <div></div>
   }
   return(
  data
    .map((pokemon)=>{
    return ( 
      <div key={pokemon.name} className="justify-self-center" >
        {GetImage(pokemon.url)}
        <h2 className="text-gray-900 leading-tight">{pokemon.name}</h2>
      </div>
      )
    })
  
   );
 }

const ShowVal = () => {
  const pokemonNames = ["bulbasaur", "ivysaur", "venusaur","charmander","charmeleon","charizard","squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate"];
  return <div>
    {pokemonNames.filter((name) => {
      if(name.toLowerCase().includes(searchTerm.toLowerCase())){
        return name;
      }
      
    })
    .map(name=>{
      return <div className=" w-96 bg-gray-50 shadow	" key={name}>{name}</div>
    })}
  </div>
}
  return (
    <div className="m-10 ">
      <center>
      <input 
        type="text" 
        className="border-2 border-gray-200 h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow, border-blue-200 focus:outline-none" 
        placeholder="Search Pokemon" 
        onChange={handleSearch} 
        value={searchTerm}
      />
      {searchTerm.length>0 ? <ShowVal /> :null}
      </center>
      <div className="grid md:grid-cols-4 grid-cols-3">
       {searchTerm.length>0 ? <Display data={filteredPokemon} />: <Display data={data.results} />}
      </div> 
    </div>
  )
}