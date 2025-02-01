import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  drawerWidth: number;
}

const initialState: LayoutState = {
  drawerWidth: 250,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    },
  },
});

export const { setDrawerWidth } = layoutSlice.actions;
export default layoutSlice.reducer;
