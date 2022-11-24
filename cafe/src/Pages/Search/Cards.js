import React from 'react'
const heart_pic ='../Assets/heart.png';
const Cards = ({ data }) => {

    return (
        <>
            {
                data.map((element, k) => {
                    return (
                        <>
                            <div className="cafe_card">

                                <div className='img_card_con'>
                                    <div className="cafe_img">
                                        <img src={element.imgData} alt='' />
                                    </div>
                                    <div className="info">

                                        <div className='cafeName'><p id='p1'><h4 className='H4'>{element.Cname}</h4></p>
                                            <p id='p2'>{element.Food_Type}</p>
                                            < p id='p3'>{element.Address}</p>
                                        </div>
                                        <div className='ratings'>< p id='p4'>{element.Ratings}</p></div>
                                    </div>
                                </div>


                                <div className="menu">
                                    <div className="like_img"><img src='={require(heart_pic)}' /></div>
                                    <div className="Menu_btn">
                                        <button id='btnMenu' placeholder='Menu'>Menu</button>
                                    </div>
                                </div>


                            </div>

                        </>
                    )
                })
            }

        </>
    )
}

export default Cards




