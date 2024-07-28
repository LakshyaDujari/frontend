import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_id:'',
    email: '',
    username: '',
    fullname:'',
    phone:'',
    image:'',
    bio:'',
    verified:'',
    friend: '',
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clear: (state, action) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase('REHYDRATE_STATE', (state, action) => {
          return { ...state, ...action.payload.slice };
        });
      }
});

export const { setData,clear } = dataSlice.actions;

export const selectData = (state) => state.data;
export default dataSlice.reducer;
