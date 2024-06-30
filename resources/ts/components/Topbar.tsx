import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Topbar = () => {
    return (
        <div className='sticky flex items-center w-full h-16 bg-orange-300'>
            <div className='flex items-center justify-center w-11/12 p-2 mt-2 mb-2 ml-auto mr-auto bg-orange-100 rounded-full'>
                <input
                    className='w-10/12 ml-2 bg-transparent outline-none'
                />
                <SearchIcon
                    className='duration-300 cursor-pointer hover:text-gray-600'
                />
            </div>
            {/* <div className='pr-5'>
                <MenuIcon
                    className='duration-300 cursor-pointer hover:text-gray-600'
                />
            </div> */}
        </div>
    )
}

export default Topbar
