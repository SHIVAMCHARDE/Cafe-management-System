import React, { useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Cards from '../Search/Cards'
import data from './CafePageData'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom/client';

const CafePage = () => {

    const [Sdata, setSdata] = useState(data);
    const cardContainer = useRef()

    useEffect(() => {


        var config = {
            method: 'post',
            url: `http://localhost:6969/cafe/getCafes`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { city: "Wardha" }
        };

        axios(config)
            .then(function (response) {

                console.log(JSON.stringify(response.data));
                setSdata(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    useEffect(() => {

        let cards = []
        {
            Sdata.forEach((data , index) => {
                cards.push( <Cards key={index} data={data} /> )
            })
        }
        const root = ReactDOM.createRoot(cardContainer.current)
        root.render(
            <>
                {cards}
            </>
        )

    }, [Sdata])


    return (
        <>
            {
                <div>
                    <SearchBar />

                    <div className="MenuSection">
                        <div className="MenuHeading">
                            <p className='menu_Heading'>Menu</p>
                        </div>
                    </div>
                    <div ref={cardContainer}>
                    </div>

                </div>
            }
        </>
    )
}
export default CafePage;
