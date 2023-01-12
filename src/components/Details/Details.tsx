import './Details.css';
import { CleanEpisode } from '../../interfaces';
import { useEffect } from 'react';

export const Details = ({
    detailEpisode,
    filteredEpisodes,
    handleDetailsWatch,
    handleReflectionChange,
    handleWatchList
    }:{ 
    detailEpisode: CleanEpisode | undefined,
    filteredEpisodes: CleanEpisode[],
    handleDetailsWatch: (id: number) => void,
    handleReflectionChange: (event: any, id: number | undefined) => void,
    handleWatchList: (id: number | undefined) => void
    }) => {
    const cast = detailEpisode?.cast.join(', ')

    useEffect(() => {
        detailEpisode && handleDetailsWatch(detailEpisode.id)
    },[filteredEpisodes])

    return(
        <div className="container-details">
            <div className="container-watch">
                <label htmlFor="watchList">On Watch List:</label>
                <input  className="checkbox" id="watchList" type="checkbox" onClick={() => handleWatchList(detailEpisode?.id)} checked={detailEpisode?.watchList}/>
            </div>
            <div className="container-img-title">
                <img src={detailEpisode?.img} className="image"/>
                <div className="title-info">
                    <p className="title">{detailEpisode?.title}</p>
                    <div className="season-episode-date">
                        <p><strong>Season:</strong> {detailEpisode?.season}</p>
                        <p><strong>Episode:</strong> {detailEpisode?.episode}</p>
                        <p><strong>Original Air Date:</strong> {detailEpisode?.airDate}</p>
                    </div>
                </div>
            </div>
            <div className="container-info">
                <div className="written-cast">
                    <p className="written"><strong>Written By:</strong> {detailEpisode?.writtenBy}</p>
                    <p className="cast"><strong>Cast:</strong> {cast}</p>
                </div>
                <p><strong>Storyline:</strong> <p className="text">{detailEpisode?.storyline}</p></p>
                <p><strong>Opening Narration:</strong> <p className="text">{detailEpisode?.openingNarration}</p></p>
                <p><strong>Closing Narration:</strong> <p className="text spoiler">{detailEpisode?.closingNarration}</p></p>
                <p><strong>Wikipedia Link:</strong> <a target="_blank" href={detailEpisode?.wikipedia}>{detailEpisode?.wikipedia}</a></p>
                <div className="container-reflection">
                    <p><strong>Add/Edit Your Own Reflection:</strong></p>
                    <textarea rows={15} value={detailEpisode?.reflection} onChange={(event) => handleReflectionChange(event, detailEpisode?.id)}></textarea>
                </div>
            </div>
        </div>
    )
}