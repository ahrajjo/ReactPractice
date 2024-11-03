import React from "react";
import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onCLickDeletButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        onChange={onChangeCheckbox}
        checked={isDone}
        type="checkbox"
        className="checkbox"
      />
      <div className="contents">{content}</div>
      <div className="Date">{new Date(date).toLocaleDateString()}</div>
      <button className="delete-btn" onClick={onCLickDeletButton}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
