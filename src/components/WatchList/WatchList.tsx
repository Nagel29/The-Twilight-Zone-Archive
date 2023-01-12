import './WatchList.css';
import { CleanEpisode } from '../../interfaces';
import { WatchCard } from '../WatchCard/WatchCard';
import { Console } from 'console';
import { watch } from 'fs';

export const WatchList = ({ filteredEpisodes }:{ filteredEpisodes: CleanEpisode[]}) => {

    const watchList = filteredEpisodes.filter(episode => episode.watchList)
    const watchCards = watchList.map(episode => {
        return (
            <WatchCard cardProps={episode}/>
        )
    })
    return(
        <div className="container-watch-list">
            {watchCards}
        </div>
    )
}