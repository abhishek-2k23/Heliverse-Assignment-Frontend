import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: '',
    isEditing: false,
    editUserId: null,
    refreshData: false,
    refreshFilterData: false,
    addUserData: {},
    domain_list: [],
    data: [],

  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
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
    },
    setRefreshFilterData(state, action){
      state.refreshFilterData = action.payload;
    },
    setAddUserData(state, action){
      state.addUserData = action.payload;
    },
  },
});

export const { setUsers, updateUser, deleteUser, setCurrentPage, setIsEditing,setTotalPages,setDomainList,setLoading,setEditUserId,setRefreshData,setRefreshFilterData,setAddUserData } = userSlice.actions;

export default userSlice.reducer;
