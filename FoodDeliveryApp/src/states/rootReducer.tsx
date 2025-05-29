import {combineReducers} from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import cartReducer2 from './reducers/cartSlice'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer2,
})

export default rootReducer
