import React from 'react'

import './CafePage.css'
import data from './CafePageData'
const CafePage = ({ data }) => {



  // export default function CafePage() 
  return (
    <>
      {

        data.map((a, k) => {
          return (
            <>
              <div>
                

                

                    {/* <div className="Veg_NonVeg_Container">
              <div className="Veg">
              <button type='submit' id='Btn-veg'>
                <div className="symbolVeg">
                  <img src="" alt="" />
                </div>
                <div>Veg</div> </button>
              </div>
          
            <div className="NonVeg_Container">
              <div className='NonVeg'>
              <button type='submit'>
                <div className="symbolNonVeg">
                  <img src="" alt="" />
                </div> 
                <div>Non Veg</div></button>
            </div> 
             </div>
             </div>

             ss */}

                    <div className="CafePage-Container">

                      <div>
                        <p className="menu-type">South Indian (10)</p>
                      </div>

                      <div className="menu-card-con">


                        <div className="menu-card-info">
                          <div className="Menu_Card">
                            <div className='Dish-name'><p>
                              {/* Masala Dosa */}
                              {a.Dish_Name}</p></div>

                            <div className='price-rate-con'>
                              <div className='Price'><p>
                                {/* 80 RS/- */}
                                {a.Price}</p></div>
                              <div className='Dish-Rating'>
                                {/* 3 star */}
                                {a.Dish_Rating}  </div>
                            </div>

                            <div className='Dish-Disp'><p>
                              {/* Crispy RIce Panckaes filled with midly spiced mashed potatos */}
                              {a.Dish_Disc}
                            </p></div>
                            <div className='AddItem'><button className='Btn-AddItem'>Add Item</button> </div>
                          </div>
                        </div>
                        <div className="menu-img-container">
                          <img src={a.Dish_img} alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                
             

            </>
          )
        })
      }

    </>
  )
}
export default CafePage