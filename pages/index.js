import { resolveHref } from 'next/dist/shared/lib/router/router';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'


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

  const pokemonData = data.results.url;

  return{
    props: { data }
  }
}
export default function Home({ data }) {

  return (
    <div>
      <h2>Welcome to the next app</h2>
      <div>{data.results.map((pokemon)=>{
        const { data, error } = useSWR(pokemon.url, fetcher) //to get the images
        if (error) return <div>failed to load</div>
        if (!data) return <div>loading...</div>
        return (
          <div>
            <img src={data.sprites.front_default} alt={data.sprites.front_default} />
            <h2 key={pokemon.id}>{pokemon.name}</h2>

            
          </div>
          
        );
      })}</div>
    </div>
  )
}
