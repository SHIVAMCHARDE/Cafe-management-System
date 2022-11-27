import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import data from './CafePageData'
import 
const CafePage = (data) => {
const [Sdata, setSdata] = useState(data);
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
                <CafePage data={Sdata}/>
            </div>

        </div>
        }
        </>
    )
}
export default CafePage;
