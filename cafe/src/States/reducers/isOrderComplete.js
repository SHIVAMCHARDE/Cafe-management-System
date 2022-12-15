const initialState = {
    isComplete:false,
    data:{},
    orderId:""
}

const checkOrderReducer = (state = initialState , action)=>{
    switch (action.type) {
        case 'ORDER':
            return action.payload
        default:
            return state
    }
}

export default checkOrderReducer