import React, { useRef } from "react";
import { CheckIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Todo } from "./todosSlice";

type TodoItemProps = {
    todo: Todo,
    removeTodo: (id: string) => void,
    completeTodo: (id: string) => void,
}

const TodoItem = (props: TodoItemProps) => {
    const { todo, removeTodo, completeTodo } = props;


  const inputRef = useRef(null);


  return (
    <div className="w-full  pb-8">
      <li className="relative flex space-x-3 todo-item overflow-hidden rounded-lg pt-6 place-content-center"
        key={todo.id}
      >
        <textarea
          className="w-4/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ref={inputRef}
          defaultValue={todo.item}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        />
        <div>

          {todo.completed === false && (
            <button
              onClick={() => completeTodo(todo.id)}
              disabled={todo.completed}
              className="m-2 inline-flex items-center rounded-full border border-transparent bg-green-600 p-1.5 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

            >
              <CheckIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
          )}

          <button
            onClick={() => removeTodo(todo.id)}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-stone-600 p-1.5 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>{" "}
        </div>
      </li>
    </div>
  );
};

export default TodoItem;