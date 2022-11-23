import React, { useState } from 'react'
import './Search.css'
import SearchData from './SearchData'
import Cards from './Cards'

const Search = (data) => {

  const [Sdata, setSdata] = useState(SearchData);
  return (
    <>
      { 
      <div className="Search_container">
        <div className="input_container">
          <img src=''/>
          <input className='input_box' type='text' id='' placeholder="Search for your fav cafe..."/>
        </div>
      <div>
          <Cards data={Sdata} />
        </div>
      </div>
        


      }


    </>
  )
}
export default Search;
