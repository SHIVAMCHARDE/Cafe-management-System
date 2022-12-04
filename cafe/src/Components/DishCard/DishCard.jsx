import React, { useState } from 'react'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './DishCard.css'
import Rating from '@mui/material/Rating';

export default function DishCard({ data , DishId }) {

    const [dish, setDish] = useState()
    const DishContainer = useRef()

    useEffect(() => {


        var config = {
            method: 'post',
            url: `http://localhost:6969/menu/getDish`,
            headers: {},
            data: {
                id: data
            }
        };

        axios(config)
            .then(function (response) {
                setDish(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])

    useEffect(() => {

        const root = createRoot(DishContainer.current)

        try {
            const dishCard = dishComponent(dish)
            root.render(dishCard)
        } catch (e) { }

    }, [dish])

    function returnDishId(e){

        const element = e.target
        element.innerHTML === "Add Item" ? element.innerHTML = "Remove Item" : element.innerHTML = "Add Item"

        try{
            DishId(dish._id)
        }catch(e){}
    }

    // {
    //     "dishName" : "Masala Dosa",
    //     "isVeg" : true,
    //     "category" : "South Indian",
    //     "price" : "80",
    //     "desc" : "Crispy RIce Panckaes filled with midly spiced mashed potatos",
    //     "cafe" : "63835f3dca55c421f67e8101"
    // }

    function getPath(path) {

        return path.replaceAll('\\', '/')
    }
    function dishComponent(data) {

        return (
            <>
                <div className="menu-card-info ">
                    <div className="Menu_Card">

                        <p className='dishName' >{data.dishName}</p>

                        <div className='price-rate-con '>
                            <p className='dishPrice' >{data.price} Rs /-</p>
                            <Rating sx={{ color: '#A5A6F6', borderRadius: '2px' }} precision={0.5} name="read-only" value={3} size="small" readOnly />

                        </div>
                        <p className='dishDesc' >{data.desc}</p>

                        <button className='AddItem' onClick={(e)=>{returnDishId(e)}} >Add Item</button>
                    </div>
                </div>

                <img src={`/Media/${getPath(data.profileImg)}`} alt="" className='dish_img' />
            </>
        )

    }



    return (
        <>
            <div className="menu-card-con " ref={DishContainer} ></div>
        </>

    )

}
