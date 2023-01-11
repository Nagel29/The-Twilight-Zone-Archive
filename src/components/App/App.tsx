import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';
import { cleanEpisodes } from '../../utilities/utilities';
import { cleanEpisode } from '../../interfaces';

const App = () => {
const [allEpisodes, setAllEpisodes] = useState<cleanEpisode[]>([])

  useEffect(() => {
    fetchEpisodes()
      .then(data => setAllEpisodes(cleanEpisodes(data)))
  })

  return(
    <h1>The Twilight Zone</h1>
  )
}

export default App;
