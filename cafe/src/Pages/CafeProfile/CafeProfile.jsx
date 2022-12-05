import React from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { useState, useEffect, useRef } from 'react'
import './CafeProfile.css'
import orderIcon from '../../Assets/Icons/orderIcon.svg'

import CafeCard from '../../Components/CafeCard/CafeCard'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'
import DishCard from '../../Components/DishCard/DishCard'
import FloatingNav from '../../Components/FloatingNav/FloatingNav'

export default function CafeProfile() {


    const cafeCardContainer = useRef()
    const [cafeInfo, setCafeInfo] = useState()
    const [orderList, setOrderList] = useState([])

    const menuContainer = useRef()

    const id = (window.location.href).split('?')[1]

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
        root.render(<CafeCard data={cafeInfo} cafeProfile={true} />)

        const menuRoot = createRoot(menuContainer.current)

        try {

            let dishes = []
            let vegDishes = []
            let nonVegDishes = []

            for (const key in cafeInfo.dishes) {
                dishes.push(<DishCard data={cafeInfo.dishes[key]} DishId={getVal} />)
            }

            menuRoot.render(dishes)


        } catch (e) { }


    }, [cafeInfo])

    function getVal(data) {
        addToList(data)
    }

    function addToList(DishData) {

        try {

            let list = orderList

            if (list.length === 0) {

                list.push(DishData)
                console.log(list);


            } else {


                list.forEach((element, index) => {

                    if (!(element.id === DishData.id)) {

                        if (index === list.length - 1) {
                            list.push(DishData)
                            console.log(list);
                            setOrderList(list)
                        }

                    } else {

                        var index = list.indexOf(element);
                        if (index !== -1) {
                            list.splice(index, 1);
                        }
                        console.log(list);
                        setOrderList(list)
                        return list
                    }

                })

            }


        } catch (e) { }
    }



    return (
        <>
            <section>
                <div className="cafeCard" ref={cafeCardContainer}>

                </div>
                <p className='Menu-text' >Menu</p>
                <hr />
                <div className="menuContainer" ref={menuContainer}>

                </div>

                <div  >
                    <FloatingNav text={'Order'} icon={orderIcon} orderList={orderList} cafeInfo={cafeInfo} />
                </div>

            </section>
        </>
    )
}
