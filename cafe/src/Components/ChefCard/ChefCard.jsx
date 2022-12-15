import React from 'react'
import { createRoot } from 'react-dom/client'
import './ChefCard.css'
import { useRef, useEffect, useState } from 'react'
import { Timer, Time, TimerOptions } from 'timer-node';
import axios from 'axios'

export default function ChefCard({ data }) {

    const [currentTimer, setCurrentTimer] = useState()
    const DishNames = useRef()
    const timerContainer = useRef()

    const d = new Date()

    const timer = new Timer({
        label: 'test-timer',
        startTimestamp: 1673772300000 // 2019-07-14 03:13:21.233Z
    });


    useEffect(() => {

        let dishes = [];

        (data.data).forEach(element => {
            dishes.push(<> <p className='POders' > {element.name + "  ( qty = " + element.qty + " )"} </p> </>)
        });

        const root = createRoot(DishNames.current)
        root.render(dishes)

        timer.start()
        setInterval(() => {

            setCurrentTimer(timer.format('%m:%s'))

        }, 1000);

        // console.log(timer.isStarted())


    }, [])

    useEffect(() => {

        const timerRoot = createRoot(timerContainer.current)
        timerRoot.render(<>{currentTimer}</>)

    }, [currentTimer])

    function OrderComplete() {

        var config = {
            method: 'post',
            url: `http://localhost:6969/order/completeOrder`,
            headers: {},
            data: { orderId : data.id }
        };

        axios(config)
            .then(function (response) {

                console.log(response.data);
                
            })

            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
            <div className="OrderCards_Container">

                <p className='PTblNo TblNo'> {data.table === undefined ? "" : data.table} </p>
                <p className='POrderTime OrderTime timer' ref={timerContainer} >  </p>

                <div className="ItemName" ref={DishNames} >
                </div>

                <div className="BtnServed">
                    <button type='submit' className='PBtnServed' onClick={()=>{OrderComplete()}} >Order Complete</button>
                </div>

            </div>
        </>
    )
}
