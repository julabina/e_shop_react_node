import React, { useEffect } from 'react';

const Promotion = () => {

    useEffect(() => {
        fetch('http://localhost:3000/api/telescopes?promo=true')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    },[])

    return (
        <main>
            
        </main>
    );
};

export default Promotion;