import {combineReducers} from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'
import cartReducer2 from './reducers/cartSlice2'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    cart2: cartReducer2,
})

export default rootReducer
