import './Form.css';
import { useEffect, useState } from 'react';
import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';

export const Form = ({ handleSort, handleSearch }: { handleSort: (sortBy: string, sortOrder: string) => void, handleSearch: (search: string) => void }) => {

    const [search, setSearch] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('sort by')
    const [sortOrder, setSortOrder] = useState<string>('ascending')

    const handleSearchChange = (event: any) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        handleSearch(search)
    }, [search])

    const handleSortChange = (event: any) => {
        setSortBy(event.target.value)
    }

    const handleOrderChange = () => {
        sortOrder === 'descending' ? setSortOrder('ascending') : setSortOrder('descending')
    }

    useEffect(() => {
        if (sortBy === 'sort by') {
            return;
        }
        handleSort(sortBy, sortOrder)
    }, [sortBy, sortOrder])

    return (
        <div className="container-form">
            <div className='container-search'>
                <label htmlFor='search-by-title' className='label'></label>
                <input type="search" id='search-by-title' name='search' placeholder="search by title" value={search} className="search" onChange={handleSearchChange} />
            </div>
            <div className="sort-container">
                <select className="dropdown" placeholder="sort by..." value={sortBy} onChange={handleSortChange}>
                    <option value="sort by" disabled hidden>sort by...</option>
                    <option value="episode">episode</option>
                    <option value="watchList">on watch list</option>
                    <option value="airDate">original air date</option>
                    <option value="season">season</option>
                    <option value="title">title</option>
                </select>
                <button className='button' onClick={handleOrderChange}><img className="arrow" data-order={sortOrder} src={sortOrder === 'descending' ? downArrow : upArrow} alt={`${sortOrder} arrow`} /></button>
            </div>
        </div>
    )
}