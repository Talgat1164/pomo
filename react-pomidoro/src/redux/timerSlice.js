import {createSlice} from '@reduxjs/toolkit'; 
import { POMODORO, SHORT_BREAK, LONG_BREAK } from '../constants';

const initialState = {
    mode: POMODORO, 
    round: 1, 
    longBreakInterval: 2, 
    modes: {
        [POMODORO]: {
            id: POMODORO,
            label: "Pomodoro",
            time: 25 * 60, 
        }, 
        [SHORT_BREAK]: {
            id: SHORT_BREAK, 
            label: "Short Break", 
            time: 5 * 60, 
        }, 
        [LONG_BREAK]: {
            id: LONG_BREAK,
            label: "Long Break",
            time: 15 * 60, 
        },
    },
};

export const timerSlice = createSlice({
    name: "timer", 
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        }, 
        updateModeTime: (state, action) => {
            const {mode, time} = action.payload; 
            state.modes[mode].time = time;
        }, 
        incrementRound: (state) => {
            state.round++;  
        },
        setLongBreakInterval: (state, action) => {
            const lbInterval = action.payload; 
            state.longBreakInterval = lbInterval; 
        }
    } 
});

export const {
    setMode,
    updateModeTime,
    incrementRound, 
    setLongBreakInterval
} = timerSlice.actions;

console.dir(timerSlice)

export default timerSlice.reducer;