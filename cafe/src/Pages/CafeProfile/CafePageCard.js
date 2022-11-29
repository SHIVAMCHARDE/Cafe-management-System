import React from 'react'

import './CafePage.css'

const CafeCard = ({ data }) => {



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

                     

                      <div className="menu-card-con">


                        <div className="menu-card-info">
                          <div className="Menu_Card">
                            <div className='Dish-name'><p>
                           
                              {a.Dish_Name}</p></div>

                            <div className='price-rate-con'>
                              <div className='Price'><p>
                              
                                {a.Price}</p></div>
                              <div className='Dish-Rating'>
                               
                                {a.Dish_Rating}  </div>
                            </div>

                            <div className='Dish-Disp'><p>
                             
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
export default CafeCard