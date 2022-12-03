import React from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { useState, useEffect, useRef } from 'react'
import './CafeProfile.css'

import CafeCard from '../../Components/CafeCard/CafeCard'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'
import DishCard from '../../Components/DishCard/DishCard'

export default function CafeProfile() {


    const cafeCardContainer = useRef()
    const [cafeInfo, setCafeInfo] = useState()

    const menuContainer = useRef()

    const id = (window.location.href).split('?')[1]
    console.log(id)

    useEffect(() => {

        var config = {
            method: 'get',
            url: `http://localhost:6969/cafe/getCafeDetails?${id}`,
            headers: {
                'Content-Type': 'application/json'
            },

        };

        axios(config)
            .then(function (response) {
                setCafeInfo(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    useEffect(() => {

        const root = createRoot(cafeCardContainer.current)
        root.render(<CafeCard data={cafeInfo} />)

        const menuRoot = createRoot(menuContainer.current)

        try {

            let dishes = []
            let vegDishes = []
            let nonVegDishes = []

            for (const key in cafeInfo.dishes) {
                    dishes.push(<DishCard data={cafeInfo.dishes[key]} />)
            }

            menuRoot.render(dishes)


        } catch (e) { }


    }, [cafeInfo])



    return (
        <>
            <section>
                <div className="cafeCard" ref={cafeCardContainer}>

                </div>
                <p className='Menu-text' >Menu</p>
                <hr />
                <div className="menuContainer" ref={menuContainer}>

                </div>
            </section>
        </>
    )
}
