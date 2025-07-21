import { createSlice } from "@reduxjs/toolkit";


const useSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,

  },


  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setAuthUser, setOtherUsers, setSelectedUser } = useSlice.actions;
export default useSlice.reducer;
