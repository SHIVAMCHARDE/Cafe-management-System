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

                    <p className='PTblNo TblNo'> Table no : 1</p>
                    <p className='POrderTime OrderTime'>Order Time : 12:45 </p>

                    <div className="ItemName">
                        <div className="Oders">
                            <p className='POders'>
                                Masala Dosa - 2
                            </p>
                            <p className='POders'>
                                Veg Pizza - 1
                            </p>
                        </div>
                    </div>

                    <div className="BtnServed">
                        <button type='submit' className='PBtnServed' >Order Complete</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
