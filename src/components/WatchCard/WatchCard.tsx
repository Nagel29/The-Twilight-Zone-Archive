import { CleanEpisode } from '../../interfaces';
import './WatchCard.css';

export const WatchCard = ({ cardProps }:{ cardProps: CleanEpisode}) => {

    return(<h1>{cardProps.title}</h1>)
}