import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers";
import {addUser} from "../thunks/addUser";
import {removeUser} from "../thunks/removeUser";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;

        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            state.data = [];
        });
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.error = null;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            // FIX ME
            console.log(action);
            state.data = state.data.filter((user) => user.id !== action.payload.id);
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const usersReducer = usersSlice.reducer;
