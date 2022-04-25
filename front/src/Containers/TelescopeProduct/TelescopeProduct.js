import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TelescopeProduct = () => {

    const params = useParams();
    const [telescopeData, setTelescopeData] = useState({});
    let back = '< retour'

    useEffect(() => {
        fetch('http://localhost:3000/api/telescopes/' + params.id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let item = {
                img: data.data.descriptionPicture,
                name: data.data.name
            }
            setTelescopeData(item)
        })
    },[])

    return (
        <main className='telescopeProduct'>
            <p>{back}</p>
            <div className="telescopeProduct__top">
                
            </div>
        </main>
    );
};
{/* <img src={process.env.PUBLIC_URL + telescopeData.img} alt={'photo de ' + telescopeData.name} /> */}

export default TelescopeProduct;

/* DESCRIPTION :
description title : Tout savoir sur ${nom du téléscope}

*/