import React from 'react'
import './ChefPage.css'

export default function ChefPage() {
    return (
        <div>
        <div className="OrderHeading">
        <p>Orders Check List</p>
      </div>
        <div className='ChefPageCon'>
         
            <div className="OrderCards_Container">

                <div className="TblNo"><p className='PTblNo'> Table no : 1</p></div>

                <div className="ItemName"><p className='PItemName'>Dish-Qty :</p>
                    <div className="Oders">
                        <p className='POders'>
                            Masala Dosa -2, Veg Pizza-1
                        </p>
                    </div>
                </div>

                <div className="OrderTime"><p className='POrderTime'>Order Time : 12:45 </p></div>
                <div className="BtnServed">
                    <button type='submit' ><p className='PBtnServed'> Ready To Served </p></button>
                </div>

            </div>

        </div>
        </div>
    )
}
