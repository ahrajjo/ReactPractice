import React from "react";
import "./App.css";
import { useState } from "react";

const mockData = [
  "조아라 React 장인이 될 수 있을까",
  "빼빼로 데이의 유래",
  "State와 props의 관계",
  "독학의 정석"
];

function Modal({ title, setTitle, ChangeTitle }) {
  return (
    <>
      <div className="modal">
        <h4>{title[ChangeTitle]}</h4>
        <p>날짜</p>
        <p>상세 내용</p>
        <button
          onClick={() => {
            let copy = [...title];
            copy[0] = "당연히 될 수 있지";
            setTitle(copy);
          }}
        >
          글수정
        </button>
      </div>
    </>
  );
}

function App() {
  const [title, setTitle] = useState(mockData);
  const [count, setCount] = useState([0, 0, 0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [ChangeTitle, setChangeTitle] = useState(0);
  const [input, setInput] = useState("");

  const onCreate = (e) => {
    e.preventDefault();
    if(input.trim()){
      setTitle([input,...title]);
      setCount([0, ...count]);
      setInput("");
    }
  }

const onDelete = (index) => {
  let updatedTitle = [...title];
  let updatedCount = [...count];

  updatedTitle.splice(index, 1);
  updatedCount.splice(index, 1);

  setTitle(updatedTitle);
  setCount(updatedCount);
}
  return (
    <>
      <div className="App">
        <div className="pink-nav">
          <h4>whkfk12.log</h4>
        </div>

        <form className="input" onSubmit={onCreate}>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="submit" className="button">글 발행하기</button>
        </form>

        {title.map((a, i) => {
          return (
            <div className="list" key={i}>
              <h4
                onClick={() => {
                  setModal(true);
                  setChangeTitle(i);
                }}
              >
                {title[i]}{" "}
                <div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...count];
                    copy[i] = copy[i] + 1;
                    setCount(copy);
                  }}
                >
                  {" "}
                  👍🏻 {count[i]}
                </span>
                {" "}
                <span className="delete" onClick={onDelete}>✖️삭제</span>
                </div>
              </h4>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          );
        })}

        {modal === true ? (
          <Modal title={title} setTitle={setTitle} ChangeTitle={ChangeTitle} />
        ) : null}
      </div>
    </>
  );
}

export default App;
