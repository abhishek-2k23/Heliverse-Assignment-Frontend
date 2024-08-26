import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: true,
    error: '',
    isEditing: false,
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
      console.log("user Data : ", state.data);
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    setLoading(state, action){
        state.loading = action.payload;
    },
    setIsEditing: (state,action) => {
      state.isEditing = action.payload;
    }
  },
});

export const { setUsers, updateUser, deleteUser, setCurrentPage, setIsEditing } = userSlice.actions;

export default userSlice.reducer;
