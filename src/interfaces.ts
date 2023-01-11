export interface RawEpisode {
    id: number,
    title: string,
    season: string,
    episode: string,
    directed_by: string,
    written_by: string,
    air_date: string,
    storyline: string,
    cast: string[],
    opening_narration: string,
    closing_narration: string,
    img: string,
    wikipedia: string
}

export interface CleanEpisode {
    airDate: string,
    cast: string[],
    closingNarration: string,
    directedBy: string,
    episode: string,
    id: number,
    img: string,
    openingNarration: string,
    season: string,
    storyline: string,
    title: string,
    wikipedia: string, 
    writtenBy: string
}

export interface TableEpisode {
    id: number,
    key: number,
    season: string,
    episode: string,
    title: string,
    airDate: string,
}
