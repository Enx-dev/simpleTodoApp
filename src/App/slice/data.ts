import { RootState } from "./../store/store";
import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  todoItems: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  completedTodoItems: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  activeTodoItems: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  todos: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  currentTodo: string;
}

const initialState: Todo = {
  todoItems: [
    {
      id: "1",
      content: "Complete online course on ReactJS",
      completed: false,
    },
    {
      id: "2",
      content: "Complete online course on AngularJS",
      completed: true,
    },
    {
      id: "3",
      content: "Complete online course on NodeJS",
      completed: false,
    },
    {
      id: "4",
      content: "Complete online course on MongoDB",
      completed: false,
    },
    {
      id: "5",
      content: "Complete online course on ExpressJS",
      completed: false,
    },
  ],
  completedTodoItems: [
    {
      id: "2",
      content: "Complete online course on AngularJS",
      completed: true,
    },
  ],
  activeTodoItems: [
    {
      id: "1",
      content: "Complete online course on ReactJS",
      completed: false,
    },
    {
      id: "3",
      content: "Complete online course on NodeJS",
      completed: false,
    },
    {
      id: "4",
      content: "Complete online course on MongoDB",
      completed: false,
    },
    {
      id: "5",
      content: "Complete online course on ExpressJS",
      completed: false,
    },
  ],
  todos: [
    {
      id: "",
      content: "",
      completed: false,
    },
  ],
  currentTodo: "all",
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoItems.unshift(action.payload);
      state.activeTodoItems.unshift(action.payload);
    },
    removeTodo: (state, action) => {
      state.todoItems = state.todoItems.filter(
        (todo) => todo.id !== action.payload
      );
      state.activeTodoItems = state.activeTodoItems.filter(
        (todo) => todo.id !== action.payload
      );
      state.completedTodoItems = state.completedTodoItems.filter(
        (todo) => todo.id !== action.payload
      );
    },
    ToogleCompleted: (state, action) => {
      const completedTodos = state.todoItems.filter(
        (todo) => todo.id === action.payload
      );
      if (completedTodos[0].completed) {
        completedTodos[0].completed = false;
        state.completedTodoItems = state.completedTodoItems.filter(
          (todo) => todo.id !== action.payload
        );
        state.activeTodoItems.unshift(completedTodos[0]);
      } else {
        completedTodos[0].completed = true;
        state.completedTodoItems.unshift(completedTodos[0]);
        state.activeTodoItems = state.activeTodoItems.filter(
          (todo) => todo.id !== action.payload
        );
      }
    },
    clearCompleted: (state) => {
      state.todoItems = state.todoItems = state.todoItems.filter(
        (todo) => todo.completed === false
      );
      state.completedTodoItems = [];
    },
    setCurrentTodo: (state, action) => {
      switch (action.payload) {
        case "all":
          state.currentTodo = action.payload;
          break;
        case "active":
          state.currentTodo = action.payload;
          break;
        case "completed":
          state.currentTodo = action.payload;
          break;
        default:
          state.currentTodo = "all";
      }
    },
    setTodos(state, action) {
      state.todos = action.payload;
      state.todoItems = action.payload;
    },
  },
});

export const {
  addTodo,
  clearCompleted,
  ToogleCompleted,
  removeTodo,
  setCurrentTodo,
  setTodos,
} = TodoSlice.actions;
export const TodoReducer = TodoSlice.reducer;

export const allTodos = (state: RootState) => state.Todo.todoItems;
export const completedTodos = (state: RootState) =>
  state.Todo.completedTodoItems;
export const activeTodos = (state: RootState) => state.Todo.activeTodoItems;
export const currentTodo = (state: RootState) => state.Todo.currentTodo;
export const todos = (state: RootState) => state.Todo.todos;
