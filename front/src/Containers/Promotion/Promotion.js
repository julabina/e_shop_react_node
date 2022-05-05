import React, { useEffect } from 'react';

const Promotion = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        
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