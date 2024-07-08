import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SearchMain from '../components/SearchMain';

const Search = () => {
    return (
        <div className='flex-1 h-full'>
            <Topbar />
            <div className='flex flex-1 w-full h-full -z-10'>
                <Sidebar />
                <SearchMain />
            </div>
        </div>
    )
}

export default Search
