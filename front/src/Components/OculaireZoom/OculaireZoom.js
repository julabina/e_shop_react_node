import React, { useState } from 'react';

const OculaireZoom = (props) => {

    const [mainPicture, setMainPicture] = useState(props.mainImg);

    return (
        <div className='carrousel'>
            <div className="carrousel__modal">
                <button onClick={props.func} className="carrousel__modal__closeBtn">X</button>
                <img src={mainPicture} alt="" />
            </div>
        </div>
    );
};

export default OculaireZoom;