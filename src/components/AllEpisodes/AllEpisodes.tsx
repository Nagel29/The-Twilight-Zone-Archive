import './AllEpisodes.css';
import { CleanEpisode } from '../../interfaces';
import { Row } from '../Row/Row';
import { Form } from '../Form/Form';

export const AllEpisodes = ({ episodes }:{ episodes: CleanEpisode[]}) => {
    const tableRows = episodes.map(episode => {
        return (
            <Row
                id={episode.id}
                key={episode.id}
                season={episode.season}
                episode={episode.episode}
                title={episode.title}
                airDate={episode.airDate}
                
            />
        )
    })

    return(
        <>
            <Form />
            <div className="container-all-episodes">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Season #</th>
                            <th>Episode #</th>
                            <th>Title</th>
                            <th>Original Air Date</th>
                            <th>On Watch List?</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        </>
    )
}