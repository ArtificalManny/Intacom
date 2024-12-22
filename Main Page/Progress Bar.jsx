import React, { useState } from 'react';


export const ProgressBar = () => {
const [progress, setProgress] = useState(0);
const handleButtonReset = ()=>{
    setProgress(0);
};

const getColor = () => {
    if(progress < 40){
        return "#ff000";
    } else if (progress < 70){
        return "#ffa500"
    } else {
        return "#2ecc71";
    }
};

    return (<div className="container">
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundCOlor: getColor()}}></div>
        </div>
        <div className="progress-label">{progress}%</div>
        <button onClick={handleButtonReset}>Reset</button>

        </div>;
    )
};
