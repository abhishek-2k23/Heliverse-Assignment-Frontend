import { createSlice } from '@reduxjs/toolkit';

// Initial state for the team slice
const initialState = {
    team_list: [],
    show_team_view: false,
    user_id: null,

};

// Create the slice
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeamList: (state, action) => {
      state.team_list = action.payload;
      console.log("Teams : ", state.team_list)
    },
    setShowTeamView: (state, action) => {
        state.show_team_view = action.payload;
      },
    setUserId: (state, action) => {
        state.user_id = action.payload;
        state.show_team_view = true;
      },
  }
})

// Export the actions
export const {
    setTeamList,
    setShowTeamView,setUserId,
} = teamSlice.actions;

// Export the reducer
export default teamSlice.reducer;
