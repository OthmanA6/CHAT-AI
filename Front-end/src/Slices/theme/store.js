import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../theme/reducer';
import aiReducer from '../ai/reducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  ai: aiReducer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
