import './Row.css';
import { CleanEpisode } from '../../interfaces';

export const Row = ({
    rowProps,
    handleRowClick,
    handleKeyPress,
    handleWatchList
}: {
    rowProps: CleanEpisode,
    handleRowClick: (id: number) => void,
    handleKeyPress: (event: any, id: number) => void,
    handleWatchList: (id: number) => void
}) => {

    return (
        <tr className="row" tabIndex={0} onKeyDown={(event) => handleKeyPress(event, rowProps.id)} onClick={() => handleRowClick(rowProps.id)}>
            <td>{rowProps.season}</td>
            <td>{rowProps.episode}</td>
            <td>{rowProps.title}</td>
            <td>{rowProps.airDate}</td>
            <td><label htmlFor={`${rowProps.title}-watch-list-checkbox`}></label><input name={`${rowProps.title}-watch-list-checkbox`} id={`${rowProps.title}-watch-list-checkbox`} className="checkbox" type="checkbox" onChange={() => handleWatchList(rowProps.id)} checked={rowProps.watchList} /></td>
        </tr>

    )
}