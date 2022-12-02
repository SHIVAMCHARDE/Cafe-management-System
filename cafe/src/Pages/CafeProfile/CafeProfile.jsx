import React from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { useState, useEffect , useRef } from 'react'

import CafeCard from '../../Components/CafeCard/CafeCard'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'

export default function CafeProfile() {
     
    // navigator.geolocation.getCurrentPosition((loc)=>{console.log(loc)} , (e)=>{console.log(e)})

    const cafeCardContainer = useRef()

    const [cafeInfo, setCafeInfo] = useState()

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
                console.log(JSON.stringify(response.data));
                setCafeInfo(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    useEffect(() => {

        const root = createRoot(cafeCardContainer.current)
        root.render(<CafeCard data={cafeInfo} />)

    }, [cafeInfo])
    


    return (
        <>
            <div className="cafeCard" ref={cafeCardContainer}>

            </div>
            <p>Menu</p>
            <hr />
        </>
    )
}
