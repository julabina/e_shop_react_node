import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import { getTelescopes } from '../../redux/telescope/telescopeReducer';

const Telescope = () => {

    const { telescopes } = useSelector(state => ({
        ...state.telescopeReducer
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        if (telescopes.length === 0) {
            dispatch(getTelescopes());
        }
    }, [])

    return (
        <main>
            <section className='telescopesList'>
                <div className="telescopesList__top">
                    <div className="telescopesList__top__top">
                        <h2>Télescopes et Lunettes astronomiques</h2>
                        <div className="telescopesList__top__top__pages"></div>
                    </div>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div className="telescopesList__main">
                    <ul>
                        {telescopes.map(el => {
                            return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.descriptionPicture} stock={el.stock} />
                        })} 
                    </ul>
                </div>
                <div className="telescopesList__bot">

                </div>
            </section>
        </main>
    );
};

export default Telescope;