import React from 'react'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'

export default function Orders() {

    const dispatch = useDispatch()
    const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
    const navigate = useNavigate()

    const user = useSelector(state => state.User)
    
    if( !user.isAuthenticated ){
            window.location.href = '/login'
    }

  return (

    <>
      <SearchBar/>
    </>

  )
}
