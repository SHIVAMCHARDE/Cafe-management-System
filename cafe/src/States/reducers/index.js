import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import checkOrderReducer from "./isOrderComplete";

const allReducers = combineReducers({
    User:loggedReducer,
    Order: checkOrderReducer
})

export default allReducers