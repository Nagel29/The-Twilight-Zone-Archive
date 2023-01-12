import { useEffect, useState } from 'react';
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

  const handleSort = (sortBy: string, sortOrder: string) => {
    const newSort = episodes.sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a[sortBy] > b[sortBy] ? 1 : -1
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1
      }

    })
    setEpisodes([...newSort])
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
          <AllEpisodes episodes={episodes} handleRowClick={handleRowClick} handleSort={handleSort}/>
          {/* <WatchList /> */}
        </div>
        <Details detailEpisode={detailEpisode}/>
      </main>
    </>
  )
}

export default App;
