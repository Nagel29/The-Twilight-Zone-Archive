import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';
import { cleanEpisodes } from '../../utilities/utilities';
import { CleanEpisode } from '../../interfaces';
import { AllEpisodes } from '../AllEpisodes/AllEpisodes';
import { WatchList } from '../WatchList/WatchList';
import { Details } from '../Details/Details';
import { sampleData } from '../../sampleData';

const App = () => {
const [episodes, setEpisodes] = useState<CleanEpisode[]>([])
const [detailEpisode, setDetailEpisode] = useState<CleanEpisode>()

  useEffect(() => {
    fetchEpisodes()
      .then(data => {
        console.log('hi')
        setEpisodes(cleanEpisodes(data))
      })
      .catch((response) => {
        console.log(response.status)
    })
  },[])

  const handleRowClick = (id: number) => {
    const singleEpisode = episodes.find(episode => {
      return episode.id === id;
    })
    setDetailEpisode(singleEpisode)
  }

  return(
    <>
      <header>
        <h1>You’ve just crossed over into…</h1>
        <h2>The Twilight Zone Archives</h2>
      </header>
      <main>
        <div className="container-left">
          <h3>All Episodes</h3>
          <AllEpisodes episodes={episodes} handleRowClick={handleRowClick}/>
          {/* <WatchList /> */}
        </div>
        <Details detailEpisode={detailEpisode}/>
      </main>
    </>
  )
}

export default App;
