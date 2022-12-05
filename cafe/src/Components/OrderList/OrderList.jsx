import React from 'react'
import { useState } from 'react'
import './OrderList.css'
import { useEffect } from 'react'
import { convertLength } from '@mui/material/styles/cssUtils'

export default function OrderList({ data, amount }) {

    const [qty, setQty] = useState(data.qty)

    useEffect(() => {

        try {
            if (!(qty === undefined)) {
                amount({ id: data.id, qty, price: qty * data.price })
            }
        } catch (e) { }

    }, [qty])


    return (
        <>
            <div className="orderListContainer">
                <button className="decrement btn" onClick={() => {
                    if (qty > 1) { setQty(qty - 1); }
                }} >-</button>
                <div className='' >
                    <p> {data.name} </p>
                    <div className='AmountAndQty' >
                        <p> Qty : {qty} </p>
                        <p> Amount : {data.price * qty} /- </p>
                    </div>
                </div>
                <button className="increment btn" onClick={() => {
                    setQty(qty + 1)
                }} >+</button>
            </div>
        </>
    )
}
