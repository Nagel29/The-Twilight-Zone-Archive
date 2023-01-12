import './AllEpisodes.css';
import { CleanEpisode } from '../../interfaces';
import { Row } from '../Row/Row';
import { Form } from '../Form/Form';

export const AllEpisodes = ({
    filteredEpisodes, 
    handleRowClick, 
    handleSort, 
    handleWatchList,
    handleSearch
    }:{ 
    filteredEpisodes: CleanEpisode[],
    handleRowClick: (id: number) => void,
    handleSort: (sortBy: string, sortOrder: string) => void,
    handleWatchList: (id: number) => void,
    handleSearch: (search: string) => void
    }) => {
    
    const tableRows = filteredEpisodes.map(episode => {
        return (
            <Row
                key={episode.id}
                rowProps={episode}
                handleRowClick={handleRowClick}
                handleWatchList={handleWatchList}
            />
        )
    })

    return(
        <>
            <Form handleSort={handleSort} handleSearch={handleSearch}/>
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