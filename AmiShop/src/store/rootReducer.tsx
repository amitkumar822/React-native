import { combineReducers } from 'redux';
import homeReducer from '@modules/home/api/slice';
import categoriesReducer from '@modules/categories/api/slice';
import cartReducer from '@modules/cart/api/slice';
import accountReducer from '@modules/account/api/slice';

const rootReducer = combineReducers({
  home: homeReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  account: accountReducer,
});

export default rootReducer;