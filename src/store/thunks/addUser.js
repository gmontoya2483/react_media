import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk(
    'users/add',

    async (payload) => {
        const response = await axios.post(
            'http://localhost:3005/users',
            payload
        );

        return response.data;
    }
);

export {addUser};
