import './Row.css';
import { CleanEpisode } from '../../interfaces';

export const Row = ({
    rowProps,
    handleRowClick,
    handleWatchList 
    }:{
    rowProps: CleanEpisode, 
    handleRowClick: (id: number) => void,
    handleWatchList: (id: number) => void
    }) => {

    return (
        <tr className="row" onClick={() => handleRowClick(rowProps.id)}>
            <td>{rowProps.season}</td>
            <td>{rowProps.episode}</td>
            <td>{rowProps.title}</td>
            <td>{rowProps.airDate}</td>
            <td><input  className="checkbox" type="checkbox" onChange={() => handleWatchList(rowProps.id)} checked={rowProps.watchList}/></td>
        </tr>

    )
}