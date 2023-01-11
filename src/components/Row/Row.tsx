import './Row.css';
import { TableEpisode } from '../../interfaces';

export const Row = ( rowProps: TableEpisode) => {

    return (
        <tr className="row">
            <td>{rowProps.season}</td>
            <td>{rowProps.episode}</td>
            <td>{rowProps.title}</td>
            <td>{rowProps.airDate}</td>
            <input type="checkbox"/>
        </tr>

    )
}