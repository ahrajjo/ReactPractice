import React from "react";
import "./TodoItem.css";
import { memo } from "react";
import { useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onCLickDeleteButton = () => {
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
      <button className="delete-btn" onClick={onCLickDeleteButton}>
        삭제
      </button>
    </div>
  );
};

// //고차 컴포넌트(HOC)
// export default memo(TodoItem, (prevProps, nextProps)=>{
//   //반환값에 따라 Props가 바뀌었는지 안바뀌었는지 판단
//   // True -> Props 바뀌지 않음 -> 리렌더링 하지마
//   // False -> Props 바뀜 -> 리렌더링 해
//   if(prevProps.id !== nextProps.id) return false;
//   if(prevProps.isDone !== nextProps.isDone) return false;
//   if(prevProps.content !== nextProps.content) return false;
//   if(prevProps.date !== nextProps.date) return false;

//   return true;
// });

export default memo(TodoItem);
