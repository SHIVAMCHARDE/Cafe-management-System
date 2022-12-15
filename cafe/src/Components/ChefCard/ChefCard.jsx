import React from 'react'
import { createRoot } from 'react-dom/client'
import './ChefCard.css'
import { useRef, useEffect, useState } from 'react'
import { Timer, Time, TimerOptions } from 'timer-node';

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
    


    return (
        <>
            <div className="OrderCards_Container">

                <p className='PTblNo TblNo'> {data.table === undefined ? "" : data.table} </p>
                <p className='POrderTime OrderTime timer' ref={timerContainer} >  </p>

                <div className="ItemName" ref={DishNames} >
                </div>

                <div className="BtnServed">
                    <button type='submit' className='PBtnServed'  >Order Complete</button>
                </div>

            </div>
        </>
    )
}
