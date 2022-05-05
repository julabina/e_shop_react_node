import React, { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <main>
            <h1>HOME</h1>
        </main>
    );
};

export default Home;