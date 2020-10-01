import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../helpers";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: fetchTasks() ? fetchTasks() : [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

export const tasks = (state) => state.tasks.tasks;

export default tasksSlice.reducer;
