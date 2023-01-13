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
import { Routes, Route, NavLink, Link } from 'react-router-dom';


const App = () => {
const [episodes, setEpisodes] = useState<CleanEpisode[]>([])
const [detailEpisode, setDetailEpisode] = useState<CleanEpisode>()
const [searchInput, setSearchInput] = useState<string>('')
const [filteredEpisodes, setFilteredEpisodes] = useState<CleanEpisode[]>([])
const [clicked, setClicked] = useState<string>('All Episodes')

  useEffect(() => {
    fetchEpisodes()
      .then(data => {
        setEpisodes(cleanEpisodes(data))
        setFilteredEpisodes(cleanEpisodes(data))
      })
      .catch((response) => {
        console.log(response.status)
    })
  },[])

  useEffect(() => {
    setFilteredEpisodes(episodes)
  }, [episodes])

  const handleRowClick = (id: number) => {
    const singleEpisode = filteredEpisodes.find(episode => {
      return episode.id === id;
    })
    setDetailEpisode(singleEpisode)
  }

  const handleWatchList = (id: number | undefined) => {
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
    return filteredEpisodes.sort((a, b) => {
        if (sortOrder === 'ascending') {
          return parseInt(a[sortBy]) - parseInt(b[sortBy])
        } else {
          return parseInt(b[sortBy]) - parseInt(a[sortBy])
        }
    })
  }

  const sortByTitle = (sortOrder: string) => {
    return filteredEpisodes.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.title > b.title ? 1 : -1
    } else {
      return a.title > b.title ? -1 : 1
      }
    })
  }

  const sortByWatch = (sortOrder: string) => {
    return filteredEpisodes.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.watchList >= b.watchList ? 1 : -1
    } else {
      return a.watchList > b.watchList ? -1 : 1
      }
    })
  }

  const sortByDate = (sortOrder: string) => {
    return filteredEpisodes.sort((a, b) => {
      let aDate = new Date(a.airDate.replace('-', '/').replace('-', '/'))
      let bDate = new Date(b.airDate.replace('-', '/').replace('-', '/'))
      if (sortOrder === 'ascending') {
        return aDate > bDate ? 1 : -1
      } else {
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
      setFilteredEpisodes([...newSort])
    }

  const handleSearch = (search: string) => {
    setSearchInput(search)
  }
    
  useEffect(() => {
    setFilteredEpisodes(episodes.filter(episode => {
      return episode.title.toLowerCase().includes(searchInput.toLowerCase())
    }))
  },[searchInput])

  const handleReflectionChange = (event: any, id: number | undefined) => {
    const updatedEpisodes = episodes.map(episode => {
      if (episode.id === id) {
        return {
          ...episode,
          reflection: event.target.value,
        }
      }
      return episode
    })

    setEpisodes([...updatedEpisodes])
  }

  return(
    <>
      <header>
        <h1>You’ve just crossed over into…</h1>
        <h2>The Twilight Zone Archives</h2>
        <nav className="container-button">
          <NavLink to="/"><button className={clicked === "All Episodes" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('All Episodes')}>All Episodes</button></NavLink>
          <NavLink to="/watch-list"><button className={clicked === "My Watch List" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('My Watch List')}>My Watch List</button></NavLink>
        </nav>
      </header>
      <main>
        <div className="container-left">
          <h3>{clicked}</h3>
          <Routes>
            <Route path="/" element={
              <AllEpisodes 
                filteredEpisodes={filteredEpisodes} 
                handleRowClick={handleRowClick} 
                handleSort={handleSort}
                handleWatchList={handleWatchList}  
                handleSearch={handleSearch}
              />}/>
            <Route path="watch-list" element={
              <WatchList 
                filteredEpisodes={filteredEpisodes}
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
              />}/>
          </Routes>
        </div>
        <Details 
          detailEpisode={detailEpisode} 
          filteredEpisodes={filteredEpisodes}
          handleDetailsWatch={handleDetailsWatch}  
          handleReflectionChange={handleReflectionChange}
          handleWatchList={handleWatchList}
        />
      </main>
    </>
  )
}

export default App;
