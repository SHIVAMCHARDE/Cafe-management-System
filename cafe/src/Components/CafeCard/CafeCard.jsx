import React from 'react'
import './CafeCard.css'
import heartIcon from '../../Assets/Icons/heartIcon.svg';
import heartIconFilled from '../../Assets/Icons/heartIconFilled.svg';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useState } from 'react';

function getPath(path) {

    return path.split('public')[1]
}

export default function CafeCard({ data , cafeProfile }) {


    const [liked, setLiked] = useState(false)

    console.log(data);
    // address :  "Karla Chowk, Wardha."
    // cafeName : "Wings Cafe"
    // city : "Wardha"
    // coordinates :  {latitude: 22.1458004, longitude: 80.0881546}
    // dishes :  []
    // orders :  []
    // owner : "637b2f95987d89353fef9e03"
    // profileImg : ""
    // subtitle :  "Fast food, North Indian, ,street Food"
    // _id : "638334b867d5a202f25f15cc"

    return (

        <>
            <div className={cafeProfile ? "cafe_card" : " cafe_card light-bg"}  >

                <div className='img_card_con'>

                    <img className="cafe_img" src={getPath(data.profileImg)} alt='' width='100%' />

                    <div className="info">

                        <div className='cafeName'>
                            <p>{data.cafeName}</p>
                            <p>{data.subtitle}</p>
                            <p>{data.address}</p>
                        </div>

                        <Rating sx={{ color: '#A5A6F6', borderRadius: '2px' }} precision={0.5} name="read-only" value={3} size="small" readOnly />
                    </div>
                </div>


                {!cafeProfile && 

                    <div className="menu ">
                        {!liked &&
                            <FavoriteBorderIcon sx={{ color: '#A5A6F6' }} className='likeIcon' onClick={() => { setLiked(true) }} />
                        }
                        {liked &&
                            <Favorite sx={{ color: '#A5A6F6' }} className='likeIcon' onClick={() => { setLiked(false) }} />
                        }
                        <button id='btnMenu' onClick={() => { window.location.href = `/profile?id=${data._id}` }} >Menu</button>

                    </div>

                }

            </div>

        </>

    )
}
