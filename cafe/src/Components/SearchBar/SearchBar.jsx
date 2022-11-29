import React from 'react'
import './SearchBar.css'
import Select from 'react-select';


export default function SearchBar() {

  const dummyHospitalList = [
    { label: 'ABC Hospital', value: 'ABC Hospital' },
    { label: 'DEF Hospital', value: 'DEF Hospital' },
    { label: 'GHI Hospital', value: 'GHI Hospital' },
  ]


  return (
    <>
      {/* <div className="input_container">
        <img src='' />
        <input className='input_box' type='text' id='' placeholder="Search for your fav cafe..." />
      </div> */}

      <div className=''>
        <div className='input_containe'>
          <Select  options={dummyHospitalList} className="search-input"  id='state-input' placeholder="State" />
        </div>
      </div>
    </>
  )
}
