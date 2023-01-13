import './WatchList.css';
import { CleanEpisode } from '../../interfaces';
import { WatchCard } from '../WatchCard/WatchCard';
import noWatch from '../../images/no-episode.gif';

export const WatchList = ({
    episodes,
    handleWatchList,
    handleRowClick
}: {
    episodes: CleanEpisode[],
    handleWatchList: (id: number) => void,
    handleRowClick: (id: number) => void
}) => {

    const watchList = episodes.filter(episode => episode.watchList)
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
    return (
        <>
            <div className="container-watch-list">
                <h3>My Watch List</h3>
                {!watchCards.length ? <div className="container-message">
                    <p className="message-no-watch">Add episodes to your watch list to view them here!</p>
                    <img className="img-no-watch" src={noWatch} />
                </div> : null}
                {watchCards}
            </div>
        </>
    )
}