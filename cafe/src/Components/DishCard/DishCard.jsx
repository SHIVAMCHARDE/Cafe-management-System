import React, { useState } from 'react'
import CafePageData from '../../Pages/CafeProfile/CafePageData'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

export default function DishCard({ data }) {

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
                console.log(JSON.stringify(response.data));
                setDish(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])

    useEffect(() => {

        const root = createRoot(DishContainer.current)

        try{
            const dishCard = dishComponent(dish) 
            root.render(dishCard)
        }catch(e){}
        
    }, [dish])



    // {
    //     "dishName" : "Masala Dosa",
    //     "isVeg" : true,
    //     "category" : "South Indian",
    //     "price" : "80",
    //     "desc" : "Crispy RIce Panckaes filled with midly spiced mashed potatos",
    //     "cafe" : "63835f3dca55c421f67e8101"
    // }

    function dishComponent(data){

        return (
            <>
                <div className="menu-card-info">
                    <div className="Menu_Card">
                        <div className='Dish-name'>
                        <p>{data.dishName}</p></div>

                        <div className='price-rate-con'>
                            <div className='Price'><p>

                                {data.price}</p></div>
                            <div className='Dish-Rating'>

                                {data.avgRating}  </div>
                        </div>

                        <div className='Dish-Disp'><p>

                            {data.desc}
                        </p></div>
                        <div className='AddItem'><button className='Btn-AddItem'>Add Item</button> </div>
                    </div>
                </div>
                <div className="menu-img-container">
                    <img src={data.profileImg} alt="" srcset="" />
                </div>

            </>
        )

    }



    return (
        <>
            <div className="menu-card-con" ref={DishContainer} ></div>
        </>

    )

}
