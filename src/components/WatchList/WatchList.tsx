import './WatchList.css';
import { CleanEpisode } from '../../interfaces';
import { WatchCard } from '../WatchCard/WatchCard';
import { Console } from 'console';
import { watch } from 'fs';

export const WatchList = ({
    filteredEpisodes, 
    handleWatchList,
    handleRowClick
    }:{ 
    filteredEpisodes: CleanEpisode[], 
    handleWatchList: (id: number) => void,
    handleRowClick: (id: number) => void
}) => {

    const watchList = filteredEpisodes.filter(episode => episode.watchList)
    const watchCards = watchList.map(episode => {
        return (
            <WatchCard 
                cardProps={episode} 
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
                key={episode.id}
                />
        )
    })
    return(
        <div className="container-watch-list">
            {watchCards}
        </div>
    )
}