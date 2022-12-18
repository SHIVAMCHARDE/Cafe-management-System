import React from 'react'
import './FeedBack.css'
import { Rating } from '@mui/material'
import { useRef, useEffect } from 'react'
import { convertLength } from '@mui/material/styles/cssUtils'
import { createRoot } from 'react-dom/client'

import useState from 'react-usestateref'

import { setOrderComplete } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'

import axios  from 'axios'

export default function FeedBack() {

    const [foodRate, setFoodRate, foodRateRef] = useState([])
    const [CafeRate, setCafeRate] = useState(null)

    const feedbackContainer = useRef()
    const dishFeedbackContainer = useRef()

    const order = useSelector(state => state.Order)
    console.log(order.data.data);


    function ifExists(arr , id){

        arr.forEach(( obj )=>{
            if( obj.id === id){
                console.log(obj)
            }
        })

        return arr

    }


    useEffect(() => {

        let dishes = [];

        (order.data.data).forEach((ele) => {
            dishes.push(
                <>
                    <p>{ele.name}</p>
                    <Rating sx={{ color: '#A5A6F6', fontSize: '3rem' }} id={ele.id} name="half-rating" size='large' defaultValue={0} precision={0.5} onChange={(e) => {
                        let rate = ifExists(foodRateRef.current , ele.id)
                        rate.push({ id: ele.id, rating: e.target.value })
                        setFoodRate(rate)
                    }} />

                </>
            )
        })

        const dishConRoot = createRoot(dishFeedbackContainer.current)
        dishConRoot.render(dishes)

    }, [])

    useEffect(() => {
        console.log(foodRateRef.current)
    }, [foodRate])



    function handleCafeRate() {

        const root = createRoot(feedbackContainer.current)
        root.render(
            <>
                <p>Your View on Cafe and Overall Service</p>
                <Rating sx={{ color: '#A5A6F6', fontSize: '3rem' }} name="half-rating" size='large' defaultValue={0} precision={0.5} onChange={(e) => { setCafeRate(e.target.value) }} />
                <button onClick={() => { handleSubmit() }}  > Submit </button>
            </>
        )

    }

    function handleSubmit() {

        var config = {
            method: 'post',
            url: 'https://localhost:6969/menu/updateRating',
            headers: {
                'Content-Type': 'application/json'
            },
            data: foodRate
        };

        axios(config)
            .then(function (response) {

                console.log("Food rating Updated")

            })
            .catch(function (error) {
                console.log(error);
            });


        

    }

    return (
        <>
            <div className="greet">
                <p>Your Order is Ready !</p>
                <p>Please Take some time to give your Feedback</p>
            </div>

            <div className="feedback" ref={feedbackContainer} >
                <p>So, How was the Food ?</p>

                <div className="dishFeedback" ref={dishFeedbackContainer} ></div>

                <button onClick={() => { handleCafeRate() }} > Next </button>
            </div>
        </>
    )
}
