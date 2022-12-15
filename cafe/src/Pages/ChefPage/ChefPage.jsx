import React from 'react'
import ChefCard from '../../Components/ChefCard/ChefCard'
import './ChefPage.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'

export default function ChefPage() {

    const [orderInfo, setOrderInfo] = useState()
    const cardContainer = useRef()

    useEffect(() => {

        let cafeId = (window.location.href).split('id=')[1]

        console.log(cafeId);

        var config = {
            method: 'post',
            url: `http://localhost:6969/order/getCurrentOrders`,
            headers: {},
            data: { cafeId }
        };

        axios(config)
            .then(function (response) {
                setOrderInfo(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    useEffect(() => {

        let cards = []
        const root = createRoot(cardContainer.current)

        try {

            console.log(orderInfo);
            orderInfo.forEach(element => {
                cards.push(<ChefCard key={element._id} data={element} />)
            });

            root.render(cards)
        }
        catch (e) { }


    }, [orderInfo])


    return (
        <div>
            <div className="OrderHeading">
                <p>Orders Check List</p>
            </div>
            <div className='ChefPageCon' ref={cardContainer}>

            </div>
        </div>
    )
}
