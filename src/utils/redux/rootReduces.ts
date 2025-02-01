import { combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "@/utils/redux/slices/exampleSlice";
import drawerReducer from "@/utils/redux/slices/drawerSlice";
import layoutReducer from "@/utils/redux/slices/layoutSlice";
import themeReducer from '@/utils/redux/slices/themeSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
  drawer: drawerReducer,
  layout: layoutReducer,
  theme: themeReducer,
});

export default rootReducer;
