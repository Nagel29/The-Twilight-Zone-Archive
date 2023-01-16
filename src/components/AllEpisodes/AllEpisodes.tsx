import './AllEpisodes.css';
import { CleanEpisode } from '../../interfaces';
import { Row } from '../Row/Row';
import { Form } from '../Form/Form';
import { useEffect, useState } from 'react';
import loading from '../../images/loading.gif';

export const AllEpisodes = ({
    episodes,
    handleWatchList,
    handleRowClick,
    handleKeyPress,
    isLoading
}: {
    episodes: CleanEpisode[],
    handleWatchList: (id: number) => void,
    handleRowClick: (id: number) => void,
    handleKeyPress: (event: any, id: number) => void,
    isLoading: boolean
}) => {

    const [searchInput, setSearchInput] = useState<string>('')
    const [filteredEpisodes, setFilteredEpisodes] = useState<CleanEpisode[]>([])

    useEffect(() => {
        setFilteredEpisodes(episodes)
    }, [episodes])

    useEffect(() => {
        setFilteredEpisodes(episodes.filter(episode => {
            return episode.title.toLowerCase().includes(searchInput.toLowerCase())
        }))
    }, [searchInput])

    const sortBySeasonOrEpisode = (sortBy: string, sortOrder: string) => {
        return filteredEpisodes.sort((a, b) => {
            if (sortOrder === 'ascending') {
                return parseInt(a[sortBy]) - parseInt(b[sortBy])
            } else {
                return parseInt(b[sortBy]) - parseInt(a[sortBy])
            }
        })
    }

    const sortByTitle = (sortOrder: string) => {
        return filteredEpisodes.sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.title > b.title ? 1 : -1
            } else {
                return a.title > b.title ? -1 : 1
            }
        })
    }

    const sortByWatch = (sortOrder: string) => {
        return filteredEpisodes.sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.watchList > b.watchList ? -1 : 1
            } else {
                return a.watchList >= b.watchList ? 1 : -1
            }
        })
    }

    const sortByDate = (sortOrder: string) => {
        return filteredEpisodes.sort((a, b) => {
            let aDate: Date = new Date(a.airDate.replace('-', '/').replace('-', '/'))
            let bDate: Date = new Date(b.airDate.replace('-', '/').replace('-', '/'))
            if (sortOrder === 'ascending') {
                return aDate > bDate ? 1 : -1
            } else {
                return aDate > bDate ? -1 : 1
            }
        })
    }

    const handleSort = (sortBy: string, sortOrder: string) => {
        let newSort;
        if (sortBy === 'season' || sortBy === 'episode') {
            newSort = sortBySeasonOrEpisode(sortBy, sortOrder)
        } else if (sortBy === 'title') {
            newSort = sortByTitle(sortOrder)
        } else if (sortBy === 'watchList') {
            newSort = sortByWatch(sortOrder)
        } else {
            newSort = sortByDate(sortOrder)
        }
        setFilteredEpisodes([...newSort])
    }

    const handleSearch = (search: string) => {
        setSearchInput(search)
    }

    const tableRows = filteredEpisodes.map(episode => {
        return (
            <Row
                key={episode.id}
                rowProps={episode}
                handleRowClick={handleRowClick}
                handleKeyPress={handleKeyPress}
                handleWatchList={handleWatchList}
            />
        )
    })

    return (
        <>
            <h3 className="header-all-episodes">All Episodes</h3>
            <Form handleSort={handleSort} handleSearch={handleSearch} />
            <div className="container-all-episodes">
                {isLoading &&
                    <div className="container-loading">
                        <p className="loading-text">Loading All Episodes...</p>
                        <img src={loading} className="loading-image" alt='Spiral loading image' />
                    </div>
                }
                {!isLoading && <div className="container-table">
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
                    {!tableRows.length ? <p className="message-sad-search">No episodes were found. Please try revising your search.</p> : null}
                </div>}
            </div>
        </>
    )
}