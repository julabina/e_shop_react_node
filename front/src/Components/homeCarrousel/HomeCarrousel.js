import React from 'react';
import img1 from '../../assets/galaxie-andromede.webp';

const HomeCarrousel = () => {
    return (
        <section className="home__carrousel">
            <img src={img1} alt="galaxie d'andromede" />
        </section>
    );
};

export default HomeCarrousel;