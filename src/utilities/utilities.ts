import { RawEpisode } from '../interfaces';

export const cleanEpisodes = (data: RawEpisode[]) => {
    const cleanData = data.map(episode => {
        return {
            airDate: episode['air_date'],
            cast: episode.cast,
            closingNarration: episode['closing_narration'],
            directedBy: episode['directed_by'],
            episode: episode.episode,
            id: episode.id,
            img: episode.img,
            openingNarration: episode['opening_narration'],
            season: episode.season,
            storyline: episode.storyline,
            title: episode.title,
            wikipedia: episode.wikipedia,
            writtenBy: episode['written_by']
        }
    })

    return cleanData;
}