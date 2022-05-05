import React, { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <main>
            <h1>404 not found</h1>
        </main>
    );
};

export default NotFound;