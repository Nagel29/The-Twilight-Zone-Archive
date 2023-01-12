import './Form.css';
import { useEffect, useState } from 'react';
import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';

export const Form = ({ handleSort }:{ handleSort: (sortBy: string, sortOrder: string) => void }) => {

    const [search, setSearch] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('sort by')
    const [sortOrder, setSortOrder] = useState<string>('descending')

    const handleSortChange = (event: any) => {
        setSortBy(event.target.value)
    }

    const handleOrderChange = () => {
        sortOrder === 'descending' ? setSortOrder('ascending') : setSortOrder('descending')
    }

    useEffect(() => {
        handleSort(sortBy, sortOrder)
    },[sortBy, sortOrder])

    return(
        <div className="container-form">
            <input type="search" placeholder="search by title" value={search} className="search"/>
            <div className="sort-container">
                <select className="dropdown" placeholder="sort by..." value={sortBy} onChange={handleSortChange}>
                    <option value="sort by" disabled hidden>sort by...</option>
                    <option value="episode">episode</option>
                    <option value="on watch list">on watch list</option>
                    <option value="airDate">original air date</option>
                    <option value="season">season</option>
                    <option value="title">title</option>
                </select>
                <button className='button' onClick={handleOrderChange}><img className="arrow" src={sortOrder === 'descending' ? downArrow : upArrow}/></button>
            </div>
        </div>
    )
}