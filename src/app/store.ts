import { configureStore } from '@reduxjs/toolkit';
import { reducer} from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

