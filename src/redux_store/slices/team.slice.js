import { createSlice } from '@reduxjs/toolkit';

// Initial state for the team slice
const initialState = {
    team_list: [],
    show_team_view: false,
    user_id: null,
    create_team : false,
    newTeamName: '',
    showTeamMembers: '',
    teamLoading: false,

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
      setCreateTeam: (state, action) => {
        state.create_team = action.payload;
      },
      setNewTeamName: (state, action) => {
        state.newTeamName = action.payload;
        console.log("team name : ", state.newTeamName)
      },
      
      setShowTeamMembers: (state, action) => {
        if(state.showTeamMembers === action.payload){
          state.showTeamMembers = 'false';
        }else{
          state.showTeamMembers = action.payload;
          console.log(state.showTeamMembers);
        }
      },

      setTeamLoading: (state, action) => {
        state.teamLoading = action.payload
      }
  }
})

//  actions
export const {
    setTeamList,
    setShowTeamView,setUserId,
    setCreateTeam,setNewTeamName,setShowTeamMembers,setTeamLoading
} = teamSlice.actions;

// Export the reducer
export default teamSlice.reducer;
