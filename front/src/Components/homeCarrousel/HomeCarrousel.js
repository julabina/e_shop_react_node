import React from 'react';
import img1 from '../../assets/galaxie-andromede.webp';
import img2 from '../../assets/carrousel1.webp';
import img3 from '../../assets/chevalConst.webp';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeCarrousel = () => {

    /**
     * HANDLE THE CARROUSEL
     * @param {*} action 
     * @returns 
     */
    const handleCarrousel = (action) => {

        const imgs = document.querySelectorAll('.home__carrousel__img');
        const btnsNav = document.querySelectorAll('.home__carrousel__nav__btn');
        
        if(action === "plus") {
            for(let i = 0; i < imgs.length; i++) {
                if(imgs[i].classList.contains('home__carrousel__img--active')) {
                    if(i === imgs.length - 1) {
                        imgs[0].classList.add('home__carrousel__img--active');
                        btnsNav[0].classList.add('home__carrousel__nav__btn--active');
                    } else {
                        imgs[i + 1].classList.add('home__carrousel__img--active');
                        btnsNav[i + 1].classList.add('home__carrousel__nav__btn--active');
                    }
                    btnsNav[i].classList.remove('home__carrousel__nav__btn--active');
                    return imgs[i].classList.remove('home__carrousel__img--active');
                }
            }
        } else if (action === "minus") {
            for(let i = 0; i < imgs.length; i++) {
                if(imgs[i].classList.contains('home__carrousel__img--active')) {
                    if(i === 0) {
                        imgs[imgs.length - 1].classList.add('home__carrousel__img--active');
                        btnsNav[btnsNav.length - 1].classList.add('home__carrousel__nav__btn--active');
                    } else {
                        imgs[i - 1].classList.add('home__carrousel__img--active');
                        btnsNav[i - 1].classList.add('home__carrousel__nav__btn--active');
                    }
                    btnsNav[i].classList.remove('home__carrousel__nav__btn--active');
                    return imgs[i].classList.remove('home__carrousel__img--active');
                }
            }
        }
    };
    
    /**
     * HANDLE NAV CARROUSEL
     * @param {*} ind 
     */
    const handleNavCarrousel = (ind) => {

        const imgs = document.querySelectorAll('.home__carrousel__img');
        const btnsNav = document.querySelectorAll('.home__carrousel__nav__btn');
        
        for(let i = 0; i < imgs.length; i++){
                imgs[i].classList.remove('home__carrousel__img--active');
                btnsNav[i].classList.remove('home__carrousel__nav__btn--active');
        }

        imgs[ind].classList.add('home__carrousel__img--active');
        btnsNav[ind].classList.add('home__carrousel__nav__btn--active');
    };

    return (
        <>
        <section className="home__carrousel">
            <button onClick={() => handleCarrousel("minus")} className='home__carrousel__btn' id='homeCarrouselLeft'><FontAwesomeIcon icon={faChevronRight} /></button>
            <img className='home__carrousel__img home__carrousel__img--active' src={img1} alt="galaxie d'andromede" />
            <img className='home__carrousel__img' src={img2} alt="des étoiles" />
            <img className='home__carrousel__img' src={img3} alt="nebuleuse à tete de cheval" />
            <button onClick={() => handleCarrousel("plus")} className='home__carrousel__btn' id='homeCarrouselRight'><FontAwesomeIcon icon={faChevronRight} /></button>
            <div className='home__carrousel__nav'>
                <button onClick={() => handleNavCarrousel(0)} className='home__carrousel__nav__btn home__carrousel__nav__btn--active'></button>
                <button onClick={() => handleNavCarrousel(1)} className='home__carrousel__nav__btn'></button>
                <button onClick={() => handleNavCarrousel(2)} className='home__carrousel__nav__btn'></button>
            </div>
        </section>
        </>
    );
};

export default HomeCarrousel;