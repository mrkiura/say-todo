import React from 'react';
import './App.css';

import TodoForm from "./features/todos/TodoForm";
import Header from "./features/todos/Header";
import Footer from "./features/todos/Footer";
import TodoList from "./features/todos/TodoList";

const App = () => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 App">
      <Header />
      <div    >
        <TodoForm />
        <TodoList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
