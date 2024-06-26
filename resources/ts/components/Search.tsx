import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = () => {
    return (
        <div className='bg-orange-300 flex items-center'>
            <div className='bg-orange-100 ml-auto mr-auto w-11/12 flex items-center justify-center mt-2 mb-2 p-2 rounded-full'>
                <input
                    className='bg-transparent outline-none ml-2 w-10/12'
                />
                <SearchIcon
                    className='cursor-pointer duration-300 hover:text-gray-600'
                />
            </div>
            {/* <div className='pr-5'>
                <MenuIcon
                    className='cursor-pointer duration-300 hover:text-gray-600'
                />
            </div> */}
        </div>
    )
}

export default Topbar
