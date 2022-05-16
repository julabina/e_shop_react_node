import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ToTop = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        const toTopBtn = document.querySelector(".toTop");
        if (scrolled > 150) {
            scrolled > 140 ? setVisible(true) : setVisible(false);
            scrolled > 200 ? toTopBtn.classList.add('toTop--visible') : toTopBtn.classList.remove('toTop--visible');
        }
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
        {
            visible &&
            <>
                <button onClick={toTop} className='toTop'>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </>
        }
        </>
    );
};

export default ToTop;