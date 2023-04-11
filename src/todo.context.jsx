import { useReducer, createContext } from "react";

import { createAction } from "./utils/reducer/todo.reducer";

const INITIAL_STATE = {
  todoList: [],
  allTasks: 0,
  incompleteTasks: 0,
  completeTasks: 0,
};

const TODO_ACTION_TYPES = {
  SET_TODO_TASKS: "SET_TODO_TASKS",
  SET_TODO_COMPLETE_TASKS: "SET_TODO_COMPLETE_TASKS",
  SET_TODO_INCOMPLETE_TASKS: "SET_TODO_INCOMPLETE_TASKS",
  SET_TODO_TOTAL_TASKS: "SET_TODO_TOTAL_TASKS",
};

const todoReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TODO_ACTION_TYPES.SET_TODO_TASKS:
      return {
        ...state,
        payload,
      };
      case TODO_ACTION_TYPES.SET_TODO_COMPLETE:
        return {
          ...state,

        }
  }
};

export const TodoContext = createContext();

export const TodoProvider = ({ chidlren }) => {
  const [{ todoTasks, totalTasks, incompleteTasks, completeTasks }, dispatch] =
    useReducer(todoReducer, INITIAL_STATE);

  const value = {
    todoTasks,
    totalTasks,
    incompleteTasks,
    completeTasks,
  };

  return <TodoContext.Provider value={value}>{chidlren}</TodoContext.Provider>;
};
