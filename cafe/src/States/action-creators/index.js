export const setIsLogged = (state) =>{
    return (dispatch)=>{
        dispatch({
            type:'SIGN_IN',
            payload:state
        })
    }
}

export const setOrderComplete = (state) =>{
    return (dispatch)=>{
        dispatch({
            type:'ORDER',
            payload:state
        })
    }
}