import { createSlice } from '@reduxjs/toolkit';

// Initial state for the nav slice
const initialState = {
  searchTerm: '',
  filterOption: 'Filter',
  showFilterMenu: false,
  showSliderMenu: false,
  activeFilterCategory: 'All'
};

// Create the slice
const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterOption: (state, action) => {
      state.filterOption = action.payload;
    },
    setShowFilterMenu: (state, action) => {
      state.showFilterMenu = action.payload;
    },
    setShowSliderMenu: (state, action) => {
      state.showSliderMenu = action.payload;
    },
    setActiveFilterCategory(state,action){
      state.activeFilterCategory = action.payload;
      
      console.log("filter cat : ", state.activeFilterCategory);
    }
  },
});

// Export the actions
export const {
  setSearchTerm,
  setFilterOption,
  setShowFilterMenu,
  setShowSliderMenu,
  setActiveFilterCategory
} = navSlice.actions;

// Export the reducer
export default navSlice.reducer;
