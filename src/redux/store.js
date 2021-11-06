import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import appReducer from './app-reducer'

const reducers = combineReducers({
    app: appReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store