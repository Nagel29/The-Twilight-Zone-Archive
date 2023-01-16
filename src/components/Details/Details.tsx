import './Details.css';
import { CleanEpisode } from '../../interfaces';
import { useEffect, useRef } from 'react';
import noEpisode from '../../images/no-episode.gif';

export const Details = ({
    detailEpisode,
    episodes,
    handleDetailsUpdate,
    handleReflectionChange,
    handleWatchList
    }:{ 
    detailEpisode: CleanEpisode | undefined,
    episodes: CleanEpisode[],
    handleDetailsUpdate: (id: number) => void,
    handleReflectionChange: (event: any, id: number | undefined) => void,
    handleWatchList: (id: number | undefined) => void
    }) => {

    const cast = detailEpisode?.cast.join(', ')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
            scrollRef.current?.scrollTo(0, 0);;
    }, [detailEpisode])

    useEffect(() => {
        detailEpisode && handleDetailsUpdate(detailEpisode.id)
    },[episodes])

    return(
        <div className="container-right">
            {!detailEpisode ? <div className="message-details">
                <p className="message-no-episode">Select an episode to see the details and add your own reflection!</p>
                <img className="img-no-episode" src={noEpisode} alt='Twilight Zone gif'/>
            </div> : null}
            {detailEpisode ? <div className="container-details" ref={scrollRef}>
                <div className="container-watch">
                    <label htmlFor="watchList">On Watch List:</label>
                    <input  className="checkbox" id="watchList" type="checkbox" onChange={() => handleWatchList(detailEpisode?.id)} checked={detailEpisode?.watchList}/>
                </div>
                <div className="container-img-title">
                    <img src={detailEpisode?.img} className="image" alt={`Image from episode: ${detailEpisode.title}`}/>
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
                    <div><strong>Storyline:</strong> <p className="text">{detailEpisode?.storyline}</p></div>
                    <div><strong>Opening Narration:</strong> <p className="text">{detailEpisode?.openingNarration}</p></div>
                    <div><strong>Closing Narration:</strong> <p className="text spoiler">{detailEpisode?.closingNarration}</p></div>
                    <div><strong>Wikipedia Link:</strong> <a target="_blank" href={detailEpisode?.wikipedia}>{detailEpisode?.wikipedia}</a></div>
                    <div className="container-reflection">
                        <p><strong>Add/Edit Your Own Reflection:</strong></p>
                        <textarea rows={15} value={detailEpisode?.reflection} onChange={(event) => handleReflectionChange(event, detailEpisode?.id)}></textarea>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}