import React, { useEffect } from 'react';

const Chien = () => {

    useEffect(() => {
        fetch('http://localhost:3000/api/telescopes')
        .then(res => console.log(res))
        
    },[])

    return (
        <div>
            
        </div>
    );
};

export default Chien;