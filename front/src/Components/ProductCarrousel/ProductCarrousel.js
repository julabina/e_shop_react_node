import React, { useEffect, useState } from 'react';

const ProductCarrousel = (props) => {

    const [mainPicture, setMainPicture] = useState(props.mainImg);
    const previous = '<', next = ">";

    useEffect(() => {
        const tinyImgs = document.querySelectorAll('.carrousel__modal__tinyImgs__cont__cover');
        for(let i = 0; i < props.images.length; i++) {
            let img = props.images[i].img;
            if (img === props.mainImg) {
                tinyImgs[i].classList.add('carrousel__modal__tinyImgs__cont__cover--active')
            }
        }
    },[])

    const changeImg = (img, ind) => {
        const tinyImgs = document.querySelectorAll('.carrousel__modal__tinyImgs__cont__cover');
        for (let i = 0; i < tinyImgs.length; i++) {
            if (tinyImgs[i].classList.contains('carrousel__modal__tinyImgs__cont__cover--active') && i !== parseInt(ind)) {
                tinyImgs[i].classList.remove('carrousel__modal__tinyImgs__cont__cover--active');
            }
            if(i === parseInt(ind) && !tinyImgs[i].classList.contains('carrousel__modal__tinyImgs__cont__cover--active')) {
                tinyImgs[i].classList.add('carrousel__modal__tinyImgs__cont__cover--active')
            }
        }
        let pict =  img;
        setMainPicture(pict);
    }

    const changeImage = (action) => {
        const tinyImgs = document.querySelectorAll('.carrousel__modal__tinyImgs__cont__cover'); 
        let main = mainPicture;
        let index;
        for(let i = 0; i < props.images.length; i++) {
            if(props.images[i].img === main) {
                index = i;
            }
        }

        for (let i = 0; i < tinyImgs.length; i++) {
            if (tinyImgs[i].classList.contains('carrousel__modal__tinyImgs__cont__cover--active')) {
                tinyImgs[i].classList.remove('carrousel__modal__tinyImgs__cont__cover--active');
            }
        }
        
        if(action === 'next') {
            if(index === (props.images.length - 1)) {
                tinyImgs[0].classList.add('carrousel__modal__tinyImgs__cont__cover--active');
                return setMainPicture(props.images[0].img)
            } else {
                let val = index + 1;
                tinyImgs[val].classList.add('carrousel__modal__tinyImgs__cont__cover--active');
                return setMainPicture(props.images[val].img)
            }
        } else if (action === 'prev') {
            if(index === 0) {
                let val = props.images.length - 1;
                tinyImgs[val].classList.add('carrousel__modal__tinyImgs__cont__cover--active');
                return setMainPicture(props.images[val].img)
            } else {
                let val = index - 1;
                tinyImgs[val].classList.add('carrousel__modal__tinyImgs__cont__cover--active');
                return setMainPicture(props.images[val].img)
            }
        }
        
    }

    return (
        <div className='carrousel'>
            <div className="carrousel__modal">
                <button onClick={props.func} className="carrousel__modal__closeBtn">X</button>
                <img src={mainPicture} alt="" />
                {
                    props.images.length > 1 && (
                        <>
                        <button onClick={() => changeImage("prev")} className='carrousel__modal__previous'>{previous}</button>
                        <button onClick={() => changeImage("next")} className='carrousel__modal__next'>{next}</button>
                        </>
                    )
                }
                <div className="carrousel__modal__tinyImgs">
                    <div className="carrousel__modal__tinyImgs__cont">
                        <div onClick={() => changeImg(props.images[0].img, 0)} className="carrousel__modal__tinyImgs__cont__cover"></div>
                        <img src={props.images[0].img} alt="" />
                    </div>
                    {
                        props.images[1] !== undefined && <div className="carrousel__modal__tinyImgs__cont">
                            <div onClick={() => changeImg(props.images[1].img, 1)} className="carrousel__modal__tinyImgs__cont__cover"></div>
                            <img src={props.images[1].img} alt="" />
                        </div>
                    }
                    {
                        props.images[2] !== undefined && <div className="carrousel__modal__tinyImgs__cont">
                            <div onClick={() => changeImg(props.images[2].img, 2)} className="carrousel__modal__tinyImgs__cont__cover"></div>
                            <img src={props.images[2].img} alt="" />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCarrousel;

