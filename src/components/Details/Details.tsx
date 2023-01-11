import './Details.css';
import { CleanEpisode } from '../../interfaces';


export const Details = ({ detailEpisode }:{ detailEpisode: CleanEpisode | undefined}) => {
    const cast = detailEpisode?.cast.join(', ')

    return(
        <div className="container-details">
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
                <p><strong>Wikipedia Link:</strong> <a href={detailEpisode?.wikipedia}>{detailEpisode?.wikipedia}</a></p>
                <p>REFLECTION COMPONENT WILL GO HERE</p>
            </div>
        </div>
    )
}