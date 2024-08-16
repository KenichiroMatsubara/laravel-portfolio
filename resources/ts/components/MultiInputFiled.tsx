import React, { FC, useState } from 'react'
import { MultiInputFieldProps } from '../types/multiInputFieldProps';
import CloseIcon from '@mui/icons-material/Close';

const MultiInputFiled: FC<MultiInputFieldProps> = ({array, setArray,placeholder}) => {
    const [errorMessage,setErrorMessage] = useState<string>("　");
    const [newElement,setNewElement] = useState<string>("");

    const handleDelete = (index) => {
        const newArray = [...array];
        newArray.splice(index,1);
        setArray(newArray);
    }

    const handleAdd = (newElement) => {
        if(newElement.trim()===""){
            setErrorMessage("入力欄が空白です");
        }
        else if(array.includes(newElement)){
            setErrorMessage("既に存在します");
        }
        else {
            const newArray = [...array];
            newArray.push(newElement);
            setArray(newArray);
        }
    }
    return (
        <div className=''>
            <div className='flex flex-wrap gap-3'>
                {array.map((element,index) => (
                    <div
                        key={index}
                        className='flex items-center justify-between gap-2 px-5 py-3 duration-300 border rounded-xl hover:bg-red-500 hover:text-white'
                    >
                        <span className='text-xl'>{element}</span>
                        <CloseIcon
                            className='text-3xl'
                            onClick={() => handleDelete(index)}
                        />
                    </div>
                ))}
            </div>
            <div className='flex items-start gap-5 mt-10'>
                <div className='flex flex-col items-center justify-center'>
                    <input
                        type="text" placeholder={placeholder} value={newElement} onChange={(e) => setNewElement(e.target.value)}
                        className='px-5 py-2 text-xl border rounded outline-none'
                    />
                    <span className='text-base text-red-400'>{errorMessage}</span>
                </div>
                <button
                    className='px-5 py-2 text-xl text-white duration-300 bg-blue-500 rounded hover:bg-blue-300'
                    onClick={() => handleAdd(newElement)}
                >
                    追加
                </button>
            </div>
        </div>
    )
}

export default MultiInputFiled
