import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TelescopeProduct = () => {

    const params = useParams();
    const [telescopeData, setTelescopeData] = useState({});

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
        <main>
            <img src={process.env.PUBLIC_URL + telescopeData.img} alt={'photo de ' + telescopeData.name} />
        </main>
    );
};

export default TelescopeProduct;

/* DESCRIPTION :
description title : Tout savoir sur ${nom du téléscope}

*/