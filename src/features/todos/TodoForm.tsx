import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodo, Todo } from "./todosSlice";
import { BookmarkIcon, CalendarIcon } from '@heroicons/react/20/solid'


const TodoForm = () => {
  const dispatch = useAppDispatch()
  const createTodo = (todo: Todo) => dispatch(addTodo(todo))
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Careful! You can't add an empty todo!");
    } else {
      const todoId = Math.floor(Math.random() * 1000)
      createTodo({
        id: todoId.toString() ,
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };
  return (
    <div className=" ">

    <div className=" place-content-center mt-1 flex rounded-md shadow-sm">
      <div className="w-2/5 relative flex  items-stretch focus-within:z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={todo}
          onChange={(e) => handleChange(e)}
          className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="What do you need to do today?"
        />
      </div>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        onClick={() => add()}
      >
        <BookmarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span>Add</span>
      </button>
    </div>
  </div>
  );
};

export default TodoForm;