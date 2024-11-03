import "./App.css";
import React, { useState, useEffect,useRef } from "react";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import Even from "./components/Even";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false);

//1.마운트
useEffect(()=>{
  console.log("mount");
},[]);

//2.업데이트(deps생략)
useEffect(()=>{
  if(!isMount.current) {
  isMount.current = true;
  return;
  }
  console.log("update");
});

//3.언마운트


  const onClinckButton = (value) => {
    setCount(count + value);
    // console.log(count);
    //안되는 이유: 비동기적이기때문에 변경되기 이전의 state값이 나온다.
  };

  return (
    <div className="App">
      <h1>아라의 심플 카운터</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClinckButton} />
      </section>
    </div>
  );
}

export default App;
