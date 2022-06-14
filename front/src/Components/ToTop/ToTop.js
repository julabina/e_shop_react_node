import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ToTop = () => {

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        const toTopBtn = document.querySelector(".toTop");
            scrolled > 200 ? toTopBtn.classList.add('toTop--visible') : toTopBtn.classList.remove('toTop--visible');
    }

    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener("scroll", toggleVisible);

    return (
        <>
                <button onClick={toTop} className='toTop'>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
        </>
    );
};

export default ToTop;