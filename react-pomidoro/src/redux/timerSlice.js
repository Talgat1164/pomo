import {createSlice} from '@reduxjs/toolkit'; 
import { POMODORO, SHORT_BREAK, LONG_BREAK } from '../constants';

const initialState = {
    mode: POMODORO, 
    modes: {
        [POMODORO]: {
            id: POMODORO,
            label: "Pomodoro",
            time: 25, 
        }, 
        [SHORT_BREAK]: {
            id: SHORT_BREAK, 
            label: "Short Break", 
            time: 5, 
        }, 
        [LONG_BREAK]: {
            id: LONG_BREAK,
            label: "Long Break",
            time: 15, 
        },
    },
};

export const timerSlice = createSlice({
    name: "timer", 
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    } 
});

export const {
    setMode,
} = timerSlice.actions;

console.dir(timerSlice)

export default timerSlice.reducer;