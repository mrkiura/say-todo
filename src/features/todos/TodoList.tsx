import React, { useState } from 'react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { completeTodo, removeTodo, selectTodos } from "./todosSlice";
import TodoItem from "./TodoItem";
import Mobilefilter from "./Mobilefilter";
import StatusFilter from "./StatusFilter";


const filters = [
    {
        id: 'status',
        name: 'Status',
        options: [
            { value: 'active', label: 'active', checked: false },
            { value: 'completed', label: 'completed', checked: false },
            { value: 'all', label: 'all', checked: false },
        ],
    }
]

const TodoList = () => {

    const todos = useAppSelector(selectTodos);
    const dispatch = useAppDispatch()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sort, setSort] = useState("active");


    const deleteTodo = (id: string) => { dispatch(removeTodo(id)) };
    const checkTodo = (id: string) => { dispatch(completeTodo(id)) };


    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Mobilefilter filters={filters} open={mobileFiltersOpen} toggleOpen={setMobileFiltersOpen} changeStatus={setSort}/>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Todos: {sort}</h1>

                        <div className="flex items-center">
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <section aria-labelledby="todo-list" className="pt-6 pb-24">
                        <h2 id="todo-list" className="sr-only">
                            Todos
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Status</h3>

                                {filters.map((status) => (
                                    <StatusFilter key={status.id} filter={status} clickHandler={setSort} />
                                ))}
                            </form>

                            {/* todos grid */}
                            <div className="lg:col-span-3">
                                <div className="flow-root">
                                    {/* begin todo items */}
                                    <ul className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full">
                                        <div >
                                            {todos.length > 0 && sort === "active"
                                                ? todos.map((item) => {
                                                    return (
                                                        item.completed === false && (
                                                            <TodoItem
                                                                key={item.id}
                                                                todo={item}
                                                                removeTodo={deleteTodo}
                                                                completeTodo={checkTodo}
                                                            />
                                                        )
                                                    );
                                                })
                                                : null}
                                            {/* for completed items */}
                                            {todos.length > 0 && sort === "completed"
                                                ? todos.map((item) => {
                                                    return (
                                                        item.completed === true && (
                                                            <TodoItem
                                                                key={item.id}
                                                                todo={item}
                                                                removeTodo={deleteTodo}
                                                                completeTodo={checkTodo}
                                                            />
                                                        )
                                                    );
                                                })
                                                : null}
                                            {/* for all items */}
                                            {todos.length > 0 && sort === "all"
                                                ? todos.map((item) => {
                                                    return (
                                                        <TodoItem
                                                            key={item.id}
                                                            todo={item}
                                                            removeTodo={deleteTodo}
                                                            completeTodo={checkTodo}
                                                        />
                                                    );
                                                })
                                                : null}
                                        </div>
                                    </ul>
                                    {/* end todo items */}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}


export default connect()(TodoList);