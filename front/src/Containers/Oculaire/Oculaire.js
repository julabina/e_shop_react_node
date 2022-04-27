import React, { useEffect } from 'react';

const Oculaire = () => {

    useEffect(() => {
        fetch('http://localhost:3000/api/oculaires')
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

export default Oculaire;