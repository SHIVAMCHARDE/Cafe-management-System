import React from 'react'
import './FloatingNav.css'

export default function FloatingNav(props) {

    return (

        <>
            <div className="orderNav" >

                <div className="orderBtn ">

                    <span>{props.text}</span>
                    <img src={props.icon} alt="" />

                </div>
            </div>
        </>

    )
}
