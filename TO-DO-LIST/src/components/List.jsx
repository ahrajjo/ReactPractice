import React from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos,onUpdate,onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
  };

const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4 className="little-title">Todo List 🧩</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색할 내용을 입력해주세요..."
      />
      <div className="todos-wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>;
        })}
      </div>
    </div>
  );
};

export default List;
