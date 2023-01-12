import { CleanEpisode } from '../../interfaces';
import './WatchCard.css';

export const WatchCard = ({
    cardProps,
    handleWatchList,
    handleRowClick
    }:{
    cardProps: CleanEpisode,
    handleWatchList: (id: number) => void,
    handleRowClick: (id: number) => void
    }) => {

    return(
    <div className="container-card" onClick={() => handleRowClick(cardProps.id)}>
        <img className="card-image" src={cardProps.img}/>
        <div className="card-info-title">
            <p className="card-title">{cardProps.title}</p>
            <div className="card-info">
                <p>Season {cardProps.season}</p>
                <p>Episode {cardProps.episode}</p>
                <label htmlFor="watchList">On Watch List:</label>
                <input className="checkbox" id="watchList" type="checkbox" onChange={() => handleWatchList(cardProps.id)} checked={cardProps.watchList}/>
            </div>
        </div>
    </div>)
}