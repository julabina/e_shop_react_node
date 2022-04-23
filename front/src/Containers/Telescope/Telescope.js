import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

                </div>
                <div className="telescopesList__bot">

                </div>
            </section>
        </main>
    );
};

export default Telescope;