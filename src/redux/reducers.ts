import {combineReducers} from '@reduxjs/toolkit'
import imageReducer from './reducers/imageReducer'

const rootReducer = combineReducers({
  image: imageReducer,
  // we can add more
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
