import React from 'react'
import axios from 'axios'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'

export default function CafeProfile() {

    const dispatch = useDispatch()
    const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
    const navigate = useNavigate()

    const user = useSelector(state => state.User)


    var data = JSON.stringify({
        "cafeName": "Wings Cafe",
        "subtitle": "Fast food, North Indian, ,street Food",
        "address": "Karla Chowk, Wardha.",
        "profileImg": "",
        "owner": "Bhavesh Anandpara"
    });

    var config = {
        method: 'post',
        url: 'http://localhost:6969/cafe/registercafe',
        headers: {
            'Content-Type': 'application/json',
            "token": user.accessToken
        },
        data: data
    };

    axios(config)
        .then(function (response) {

            console.log(JSON.stringify(response.data));


        })
        .catch(function (error) {

            console.log(error);
            if (error.response.status === 440) {
                alert("Session Expired")
                // window.location.href = '/login'
            }
        });


    return (
        <>
            <p>Profile</p>
        </>
    )
}
