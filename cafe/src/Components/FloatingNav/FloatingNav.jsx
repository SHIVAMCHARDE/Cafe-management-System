import React from 'react'
import './FloatingNav.css'

export default function FloatingNav(props) {

    function orderItem() {

        localStorage.setItem('orderList', JSON.stringify(props.orderList))

        let table = (window.location.href).split('table=')[1]

        if (table) {
            window.location.href = `/order?id=${props.cafeInfo._id}&name=${props.cafeInfo.cafeName}&table=${table}`
        }
        else {
            window.location.href = `/order?id=${props.cafeInfo._id}&name=${props.cafeInfo.cafeName}`
        }

    }

    return (

        <>
            <div className="orderNav" >
                <div className="orderBtn " onClick={() => {  if(props.text === 'Order') (orderItem()) }}>
                    <span>{props.text}</span>
                    <img src={props.icon} alt="" />

                </div>
            </div>
        </>

    )
}
