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

  const handleWatchList = (id: number) => {
    const updatedEpisodes = episodes.map(episode => {
      if (episode.id === id) {
        return {
          ...episode,
          watchList: !episode.watchList,
        }
      }
      return episode
    })

    setEpisodes([...updatedEpisodes])
  }

  const handleDetailsWatch = (id: number) => {
    setDetailEpisode(episodes.find(episode => episode.id === id))
  }

  const sortBySeasonOrEpisode = (sortBy: string, sortOrder: string) => {
    return episodes.sort((a, b) => {
        if (sortOrder === 'ascending') {
          return parseInt(a[sortBy]) - parseInt(b[sortBy])
        } else {
          return parseInt(b[sortBy]) - parseInt(a[sortBy])
        }
    })
  }

  const sortByTitle = (sortOrder: string) => {
    return episodes.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.title > b.title ? 1 : -1
    } else {
      return a.title > b.title ? -1 : 1
      }
    })
  }

  const sortByWatch = (sortOrder: string) => {
    return episodes.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.watchList > b.watchList ? -1 : 1
    } else {
      return a.watchList > b.watchList ? 1 : -1
      }
    })
  }

  const sortByDate = (sortOrder: string) => {
    return episodes.sort((a, b) => {
      if (sortOrder === 'ascending') {
        let aDate = new Date(a.airDate.replace('-', '/').replace('-', '/'))
        let bDate = new Date(b.airDate.replace('-', '/').replace('-', '/'))
        return aDate > bDate ? 1 : -1
      } else {
        let aDate = new Date(a.airDate.replace('-', '/').replace('-', '/'))
        let bDate = new Date(b.airDate.replace('-', '/').replace('-', '/'))
        return aDate > bDate ? -1 : 1
      }
    })
  }

  const handleSort = (sortBy: string, sortOrder: string) => {
    let newSort; 
    if (sortBy === 'season' || sortBy === 'episode') {
        newSort = sortBySeasonOrEpisode(sortBy, sortOrder)
      } else if (sortBy === 'title') {
        newSort = sortByTitle(sortOrder)
      } else if (sortBy === 'watchList') {
        newSort = sortByWatch(sortOrder)
      } else {
        newSort = sortByDate(sortOrder)
      }
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
          <AllEpisodes 
            episodes={episodes} 
            handleRowClick={handleRowClick} 
            handleSort={handleSort}
            handleWatchList={handleWatchList}  
          />
          {/* <WatchList /> */}
        </div>
        <Details 
          detailEpisode={detailEpisode} 
          episodes={episodes}
          handleDetailsWatch={handleDetailsWatch}  
        />
      </main>
    </>
  )
}

export default App;
