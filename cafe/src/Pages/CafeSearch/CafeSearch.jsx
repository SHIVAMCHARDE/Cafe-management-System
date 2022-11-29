import React, { useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Cards from '../Search/Cards'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom/client';

const CafeSearch = () => {

    const [Sdata, setSdata] = useState();
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

        try {

            Sdata.forEach((data, index) => {
                cards.push(<Cards key={index} data={data} />)
            })
        } catch (e) { }

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
                    
                    <div ref={cardContainer}>
                    </div>

                </div>
            }
        </>
    )
}
export default CafeSearch;
