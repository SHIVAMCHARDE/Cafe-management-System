import React from 'react'
import './CafeForm.css'

export default function CafeForm() {
    return (
        <div className='CafeFormCon'>
            <div className="RegisterHeading">
                <p>Register Your Cafe</p>
            </div>

            <div className="CafeInfoCon">
                <div className="CafePic_Name_con">
                    <img src='' className='ImgCafeForm' />
                </div>
                <div className="CafeAddCity">
                    <div className="Cafe_Name">
                        <input placeholder='Cafe Name' className='InputCafe_Name' />
                    </div>
                    <div className="Subtitle">
                        <input placeholder='Subtitle' ClassName="InputSubtitle" id='SubTitle'/>
                    </div>
                </div>
            </div>
            <div className="AddCity">
                <div className="Add">
                <input placeholder='Address' className='InputAdd'/>
                </div>
                <div className="City">
                <input placeholder='City' className='InputCity'/>
                </div>
            </div>
        </div>
    )
}
