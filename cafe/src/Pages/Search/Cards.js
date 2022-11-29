import React from 'react'
const heart_pic ='../Assets/heart.png';
const Cards = ({ data }) => {

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

function getPath( path ){
        return path.split('public')[1]
}

    return (
        <>
                            <div className="cafe_card border"  onClick={()=>{ window.location.href = `/profile?id=${data._id}` }} >

                                <div className='img_card_con'>
                                    <div className="cafe_img">
                                        <img src={getPath(data.profileImg)} alt='' />
                                    </div>
                                    <div className="info">

                                        <div className='cafeName'><p id='p1'><h4 className='H4'>{data.cafeName}</h4></p>
                                            <p id='p2'>{data.subtitle}</p>
                                            <p id='p3'>{data.address}</p>
                                        </div>
                                        <div className='ratings'>< p id='p4'>{data.ratings}</p></div>
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
}

export default Cards





