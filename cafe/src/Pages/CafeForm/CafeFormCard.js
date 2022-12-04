
import React from 'react'
// import '../CafeProfile/CafePage.css'
import '../CafeForm/CafeForm.css'


export default function CafeFormCard() {
  return (
    <div>
      <div className="CafePage-Container">
        <div className="menu-card-con">

          <div className="menu-card-info">
            <div className="Menu_Card">
              <div className='Dish-name'>
                <input type='text' Placeholder="Dish Name" className='Dish_Name_Input' id='DishName' /></div>

              <div className='price-rate-con'>
                <div className='Prices'>
                  <input type="text" placeholder="Price RS/-" className='' id='Price' />
                </div>

              </div>
              <div className='Category'>

                <input type="text" placeholder="Category" className='' id='Category' />  </div>
              <div className='Dish-Disp'>
                <input type="text" placeholder="Desc" className='DishDesc' id='Desc' />
              </div>
              <div className='AddItems'><button className='Btn-AddItem'>Add Item</button> </div>
            </div>


            <div className="Btn_vegNonVeg">
            
{/* PLACE HERE BUTTON */}
            </div>

          </div>
          <div className="menu-imgContainer">
            <img src="" alt="" typeof='file' srcset="" />
          </div>

        </div>
      </div>
    </div>
  )
}
