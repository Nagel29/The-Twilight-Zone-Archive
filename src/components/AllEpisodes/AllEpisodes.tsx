import './AllEpisodes.css';
import { CleanEpisode } from '../../interfaces';
import { Row } from '../Row/Row';
import { Form } from '../Form/Form';

export const AllEpisodes = ({ episodes, handleRowClick }:{ episodes: CleanEpisode[], handleRowClick: (id: number) => void}) => {
    const tableRows = episodes.map(episode => {
        return (
            <Row
                key={episode.id}
                rowProps={episode}
                handleRowClick={handleRowClick}
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