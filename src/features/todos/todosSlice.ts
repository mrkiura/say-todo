import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";


export type Todo = {
    id: string;
    item: string;
    completed: boolean;
}

export type TodosState = {
  todos: Array<Todo>;
}

const initialState: TodosState = {
  todos: []
} as TodosState;


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !==  action.payload)
      }
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: true }
          : todo
        )
      };
    },
  },
});

export const { addTodo, removeTodo, completeTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const reducer =  todosSlice.reducer;
