import React, { useState } from 'react'
import MultiInputFiled from '../components/MultiInputFiled';

const Test = () => {
    const handleTest = () => {
        console.log("test");
    };
    const [array,setArray] = useState<string[]>(["react","laravel"]);
    return (
        <div>
            <button
                onClick={() =>handleTest()}
            >
                テスト
            </button>
            <MultiInputFiled array={array} setArray={setArray} placeholder='ここに何か入力してください' />
        </div>
    )
}

export default Test
