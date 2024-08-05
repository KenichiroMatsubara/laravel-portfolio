import React from 'react'

const Test = () => {
    const handleTest = () => {
        console.log("test");
    };
    return (
        <div>
            <button
                onClick={() =>handleTest()}
            >
                テスト
            </button>
        </div>
    )
}

export default Test
