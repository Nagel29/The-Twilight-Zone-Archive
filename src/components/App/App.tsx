import { useEffect, useState } from 'react';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';
import { cleanEpisodes } from '../../utilities/utilities';
import { CleanEpisode } from '../../interfaces';
import { AllEpisodes } from '../AllEpisodes/AllEpisodes';
import { WatchList } from '../WatchList/WatchList';
import { Details } from '../Details/Details';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Error } from '../Error/Error';
import { PageNotFound } from '../PageNotFound/PageNotFound';


const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [episodes, setEpisodes] = useState<CleanEpisode[]>([])
  const [detailEpisode, setDetailEpisode] = useState<CleanEpisode>()
  const [clicked, setClicked] = useState<string>('All Episodes')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetchEpisodes()
      .then(data => {
        setEpisodes(cleanEpisodes(data))
        setIsLoading(false)
      })
      .catch((response) => {
        console.log(response)
        setError(true)
        setIsLoading(false)
      })
  }, [])

  const closeError = () => {
    setError(false)
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

  const handleRowClick = (id: number) => {
    const singleEpisode = episodes.find(episode => {
      return episode.id === id;
    })
    setDetailEpisode(singleEpisode)
  }

  const handleKeyPress = (event: any, id: number) => {
    if (event.keyCode === 13) {
      const singleEpisode = episodes.find(episode => {
        return episode.id === id;
      })
      setDetailEpisode(singleEpisode)
    }
  }

  const handleDetailsUpdate = (id: number) => {
    setDetailEpisode(episodes.find(episode => episode.id === id))
  }

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

  return (
    <>
      <header>
        <h1>You’ve just crossed over into…</h1>
        <h2>The Twilight Zone Archives</h2>
        <nav className="container-button">
          <NavLink to="/" tabIndex={-1}><button className={clicked === "All Episodes" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('All Episodes')}>All Episodes</button></NavLink>
          <NavLink to="/watch-list" tabIndex={-1}><button className={clicked === "My Watch List" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('My Watch List')}>My Watch List</button></NavLink>
        </nav>
      </header>
      <main>
        {error && <Error closeError={closeError} />}
        <div className="container-left">
          <Routes>
            <Route path="*" element={<PageNotFound />}/>
            <Route path="/" element={
              <AllEpisodes
                episodes={episodes}
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
                handleKeyPress={handleKeyPress}
                isLoading={isLoading}
              />} />
            <Route path="watch-list" element={
              <WatchList
                episodes={episodes}
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
                handleKeyPress={handleKeyPress}
              />} />
          </Routes>
        </div>
          <Routes>
            {["/", "/watch-list"].map(path => 
              <Route path={path} key={path} element={<Details
                detailEpisode={detailEpisode}
                episodes={episodes}
                handleDetailsUpdate={handleDetailsUpdate}
                handleReflectionChange={handleReflectionChange}
                handleWatchList={handleWatchList}
              />}/>
            )}
          </Routes>
      </main>
    </>
  )
}

export default App;
