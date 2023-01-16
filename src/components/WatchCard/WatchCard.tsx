import { CleanEpisode } from '../../interfaces';
import './WatchCard.css';

export const WatchCard = ({
    cardProps,
    handleWatchList,
    handleRowClick,
    handleKeyPress
}: {
    cardProps: CleanEpisode,
    handleWatchList: (id: number) => void,
    handleRowClick: (id: number) => void,
    handleKeyPress: (event: any, id: number) => void
}) => {

    return (
        <div className="container-card" tabIndex={0} onKeyDown={(event) => handleKeyPress(event, cardProps.id)} onClick={() => handleRowClick(cardProps.id)}>
            <img className="card-image" src={cardProps.img} alt={`Image from episode: ${cardProps.title}`} />
            <div className="card-info-title">
                <p className="card-title">{cardProps.title}</p>
                <div className="card-info">
                    <p>Season {cardProps.season}</p>
                    <p>Episode {cardProps.episode}</p>
                    <label htmlFor={`${cardProps.title}-watchList`}>On Watch List:</label>
                    <input className="checkbox" id={`${cardProps.title}-watchList`} name={`${cardProps.title}-watchList`} type="checkbox" onChange={() => handleWatchList(cardProps.id)} checked={cardProps.watchList} />
                </div>
            </div>
        </div>)
}