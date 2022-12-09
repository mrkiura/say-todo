import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { completeTodo, removeTodo, selectTodos } from "./todosSlice";
import TodoItem from "./TodoItem";


const filters = [
    {
        id: 'status',
        name: 'Status',
        options: [
            { value: 'active', label: 'Active', checked: false },
            { value: 'completed', label: 'Completed', checked: false },
            { value: 'all', label: 'All', checked: false },
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
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Status</h3>


                                        {filters.map((section) => (
                                            <div key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                <>
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <button type="button" onClick={() => setSort(option.value)}>
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="radio"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            </div>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

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

                                {filters.map((section) => (
                                    <div key={section.id} className="border-b border-gray-200 py-6">
                                        <>
                                            <h2 >
                                                {section.name}
                                            </h2>
                                            <div className="space-y-4 mt-2">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <button type="button" onClick={() => setSort(option.value)}>
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="radio"
                                                                defaultChecked={option.checked}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    </div>
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