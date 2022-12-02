import React, { useState } from 'react'
import CafePageData from '../../Pages/CafeProfile/CafePageData'

export default function DishCard({data}) {

    // {
    //     "dishName" : "Masala Dosa",
    //     "isVeg" : true,
    //     "category" : "South Indian",
    //     "price" : "80",
    //     "desc" : "Crispy RIce Panckaes filled with midly spiced mashed potatos",
    //     "cafe" : "63835f3dca55c421f67e8101"
    // }

    return (
        <>
                        <div className="menu-card-con">


                            <div className="menu-card-info">
                                <div className="Menu_Card">
                                    <div className='Dish-name'><p>

                                        {data.dishName}</p></div>

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
                        </div>

        </>
    )

}
