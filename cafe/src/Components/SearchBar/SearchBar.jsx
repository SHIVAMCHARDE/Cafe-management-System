import React, { useRef } from 'react'
import './SearchBar.css'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { createRoot } from 'react-dom/client';
import search from '../../Assets/Icons/search.svg'


export default function SearchBar() {

  const searchBar = useRef()

  const searchStyle = {
    input: (provided, state) => ({
      ...provided,
      padding: '0px',
      border: 'none',
      outline: 'none',
      color:'#A5A6F6'
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      display : 'none',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'none',
      border: 'none',
      boxShadow: 'none',
      "&:hover": {
        border: 'none !important',
      }
    }),
    container: (provided, state) => ({
      ...provided,
      "&:hover": {
        border: 'none',
      }
    }),
  }

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


        let list = []

        try {

          response.data.forEach(element => {
            list.push({ label: element.cafeName, value: element._id })
          });

          const root = createRoot(searchBar.current)

          root.render(
            <>
              <img src={search} alt="" />
              <Select styles={searchStyle} options={list} className="search-input " id='state-input' placeholder="Search for Cafes" onChange={(e) => { window.location.href = `/profile?id=${e.value}` }} />
            </>
          )

        } catch (e) { }


      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  return (
    <>
      <div className=''>
        <div className='input_container ' ref={searchBar} >

        </div>
      </div>
    </>
  )
}
