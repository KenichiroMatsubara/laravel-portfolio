import React, { FC } from 'react';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import { searchbarProps } from '../types/searchbarProps';

const Searchbar: FC<searchbarProps> = ({searchKey,setSearchKey,searchInput,setSearchInput}) => {
    const options:{value:string,label:string}[] = [
        {value: 'all',label: '何でも検索'},
        {value: 'name',label :'名前'},
        {value: 'stack',label: '使用技術'},
        {value: 'place',label: '勤務地'},
    ];
    const handleSelectOnChange = (option:any):void => {
        setSearchKey(option.value);
        console.log(searchKey)
    };
    return (
        <div className='sticky flex items-center w-full h-16 gap-5'>
            <Select
                className='w-32 text-sm'
                options={options}
                onChange={handleSelectOnChange}
                placeholder={'検索キー'}
                defaultInputValue='何でも検索'
            />
            <div className='flex items-center justify-center w-11/12 p-2 px-5 my-2 bg-orange-100 rounded-full'>
                <input
                    className='w-10/12 bg-transparent outline-none'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon
                    className='duration-300 cursor-pointer hover:text-gray-600'
                />
            </div>
        </div>
    )
}

export default Searchbar
