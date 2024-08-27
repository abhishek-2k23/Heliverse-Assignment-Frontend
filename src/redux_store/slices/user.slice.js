import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentPage: 1,
    totalPages: 1,
    loading: true,
    error: '',
    isEditing: false,
    editUserId: null,
    refreshData: false,
    domain_list: [],
    data: [],
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
      console.log("user Data : ", state);

    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    setLoading(state, action){
        state.loading = action.payload;
    },
    setIsEditing: (state,action) => {
      state.isEditing = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
      console.log("total pages : ", state.totalPages)
    },
    setDomainList: (state, action) => {
      state.domain_list = action.payload;
    },
    setEditUserId: (state,action) => {
      state.editUserId = action.payload;
    },
    setRefreshData: (state,action) => {
      state.refreshData = action.payload;
    }
  },
});

export const { setUsers, updateUser, deleteUser, setCurrentPage, setIsEditing,setTotalPages,setDomainList,setEditUserId,setRefreshData } = userSlice.actions;

export default userSlice.reducer;
