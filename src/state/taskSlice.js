import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'task',
    initialState: {
        editedTask: null
    },
    reducers: {
        setTaskListToEdit: (state,action) => {
            console.log(action.payload)
            state.editedTask = action.payload;
        },
        addTask: (state,action) => {
            console.log(action.payload)
            state.editedTask.tasks = [...state.editedTask.tasks, action.payload];
        },
    },
})

export const { setTaskListToEdit, addTask } = slice.actions

export default slice.reducer

export const getEditedTask = (state) => state.task.editedTask;