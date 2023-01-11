import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';

const App = () => {

  useEffect(() => {
    fetchEpisodes()
      .then(data => console.log(data))
  })

  return(
    <h1>The Twilight Zone</h1>
  )
}

export default App;
