import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import CafePageData from './CafePageData'
import CafePageCard from'./CafePageCard' 
const CafePage = (data) => {

const [Sdata, setSdata] = useState(CafePageData);
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
            <div>
                        <p className="menu-type">South Indian (10)</p>
                      </div>
            <div>
                <CafePageCard data={Sdata}/>
            </div>

        </div>
        }
        </>
    )
}
export default CafePage;
