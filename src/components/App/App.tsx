import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';
import { cleanEpisodes } from '../../utilities/utilities';
import { cleanEpisode } from '../../interfaces';
import { AllEpisodes } from '../AllEpisodes/AllEpisodes';
import { WatchList } from '../WatchList/WatchList';
import { Details } from '../Details/Details';


const App = () => {
const [episodes, setEpisodes] = useState<cleanEpisode[]>([])

  useEffect(() => {
    fetchEpisodes()
      .then(data => setEpisodes(cleanEpisodes(data)))
  })

  return(
    <>
      <h1>You’ve just crossed over into… <br/>The Twilight Zone</h1>
      <AllEpisodes />
      <WatchList />
      <Details />
    </>
  )
}

export default App;
