import React, { useState } from 'react'
import './Search.css'
import SearchData from './SearchData'
import CafeCard from '../../Components/CafeCard/CafeCard'
import SearchBar from '../../Components/SearchBar/SearchBar'


const Search = (data) => {

  const [Sdata, setSdata] = useState(SearchData);
  return (
    <>
      { 
      <div className="Search_container">
             <SearchBar/>
      <div className='card_container'>
          <CafeCard data={Sdata} />
        </div>
      </div>

      }
    </>
  )
}
export default Search;
