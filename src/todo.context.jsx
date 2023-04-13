import { useReducer, createContext, useEffect } from "react";

import { createAction } from "./utils/reducer/todo.reducer";

const getItemfromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
console.log(
  "🚀 ~ file: todo.context.jsx:6 ~ getItemfromLocalStorage:",
  getItemfromLocalStorage
);

// const INITIAL_STATE = {
//   todoList: getItemfromLocalStorage || [],
//   totalTasks: getItemfromLocalStorage ? getItemfromLocalStorage.length : 0,
//   incompleteTasks: getItemfromLocalStorage
//     ? getItemfromLocalStorage.filter((item) => item.complete == false)
//     : 0,
//   completeTasks: getItemfromLocalStorage
//     ? getItemfromLocalStorage.filter((item) => item.complete == true)
//     : 0,
// };

const INITIAL_STATE = {
  todoList: JSON.parse(localStorage.getItem("todoList")) || [],
  totalTasks: 0,
  incompleteTasks: 0,
  completeTasks: 0,
};

const TODO_ACTION_TYPES = {
  SET_TODO_TASKS: "SET_TODO_TASKS",
};

const todoReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TODO_ACTION_TYPES.SET_TODO_TASKS:
      return {
        ...state,
        ...payload,
      };
  }
};

export const TodoContext = createContext({
  todoList: [],
  totalTasks: 0,
  incompleteTasks: 0,
  completeTasks: 0,
  addTaskToTodoList: () => {},
  removeTaskFromTodoList: () => {},
  toggleEditableTaskInTodoList: () => {},
  toggleTaskCompleteCheck: () => {},
  changeLabelAndUpdateTodoList: () => {},
  clearAllcompleteTasks: () => {},
});

export const TodoProvider = ({ children }) => {
  const [{ todoList, totalTasks, incompleteTasks, completeTasks }, dispatch] =
    useReducer(todoReducer, INITIAL_STATE);

  const updateTodoListReducer = (newTodoLists) => {
    const newTotalTask = newTodoLists.length;

    const newIncompleteTasks = newTodoLists.filter(
      (taskItem) => taskItem.complete == false
    ).length;

    const newCompletetasks = newTodoLists.filter(
      (taskItem) => taskItem.complete == true
    ).length;

    dispatch(
      createAction(TODO_ACTION_TYPES.SET_TODO_TASKS, {
        todoList: newTodoLists,
        totalTasks: newTotalTask,
        incompleteTasks: newIncompleteTasks,
        completeTasks: newCompletetasks,
      })
    );

    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  useEffect(() => {
    if (todoList.length > 0) {
      updateTodoListReducer(todoList);
    }
  }, [todoList]);

  const addTaskToTodoList = (id, label) => {
    const newTodoList = [
      ...todoList,
      {
        id,
        label,
        complete: false,
        isEditable: false,
      },
    ];
    updateTodoListReducer(newTodoList);
  };

  const removeTaskFromTodoList = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id != id);
    updateTodoListReducer(newTodoList);
  };

  const toggleEditableTaskInTodoList = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          isEditable: true,
        };
      } else {
        return todo;
      }
    });

    updateTodoListReducer(newTodoList);
  };

  const toggleTaskCompleteCheck = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      } else {
        return todo;
      }
    });

    updateTodoListReducer(newTodoList);
  };

  const changeLabelAndUpdateTodoList = (id, newLabel) => {
    const oldLabel = todoList.find((task) => task.id == id).label;

    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          label: newLabel || oldLabel,
          isEditable: false,
        };
      } else {
        return todo;
      }
    });
    updateTodoListReducer(newTodoList);
  };

  const clearAllcompleteTasks = () => {
    const newTodoList = todoList.filter(
      (taskItem) => taskItem.complete == false
    );

    updateTodoListReducer(newTodoList);
  };

  const value = {
    todoList,
    totalTasks,
    incompleteTasks,
    completeTasks,
    addTaskToTodoList,
    removeTaskFromTodoList,
    toggleEditableTaskInTodoList,
    changeLabelAndUpdateTodoList,
    toggleTaskCompleteCheck,
    clearAllcompleteTasks,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
