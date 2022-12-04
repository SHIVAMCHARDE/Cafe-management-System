import React from 'react'
import './CafeForm.css'
import CafeFormCard from './CafeFormCard.js'

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
            <div className="CafeFormMenu">
                <p>Menu</p>
            </div>
           
            <div className="FormCards">
                {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi possimus aspernatur, unde inventore eveniet ab itaque aliquam laboriosam accusantium praesentium sunt dignissimos. Reprehenderit cum voluptatibus expedita corrupti. Esse voluptate pariatur nemo odit omnis tempore aperiam nihil, fugit numquam eligendi id consectetur dolore aut deleniti nam eaque dicta incidunt saepe cumque quis. Officiis, nihil aspernatur culpa similique repellat modi? At libero iusto adipisci accusantium nihil fugiat. Temporibus, enim. */}
                <CafeFormCard/>
            </div>
        </div>
    )
}
