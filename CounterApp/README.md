# 카운트 앱 만들기

>저번에는 자바스크립트를 사용해서 카운트 앱을 만들었는데 
오늘은 리액트를 사용해서 엄청 심플한 카운트 앱을 만들어야지 😊

그럴려면 먼저 폴더를 만들어 주고 !
eslint도 세팅해주고 ! strictmode도 지워주고 !
그리고 간단하게 컴포넌트를 나누어 주었다.

![](https://velog.velcdn.com/images/whkfk12/post/b247a65b-6619-443b-a0d3-20a094e9ea8b/image.png)

이렇게 나눈 이유는 일단 카운트가 보이는 곳과 밑에 버튼을 누르면 숫자가 올라가는 곳
이렇게 두가지로 나누어서 생각했다 

그 뒤에 간단하게
```jsx
// Viewer 부분
const Viewer = () => {
  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>0</h1>
    </div>
  )
}

export default Viewer;

// Controller 부분
const Controller = () => {
  return (
    <div>
      <button>-1</button>
      <button>-10</button>
      <button>-100</button>
      <button >+100</button>
      <button>+10</button>
      <button>+1</button>
    </div>
  )
}

export default Controller;
// App.jsx부분
import "./App.css";
import React, { useState } from 'react'
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";

function App() {
  return (
    <div className="App">
      <h1>아라의 심플 카운터</h1>
      <section>
        <Viewer />
      </section>
      <section>
        <Controller />
      </section>
    </div>
  );
}

export default App;
```
정말 심플하게 CSS만 주고 형태만 만들어 주었다.
하지만 내가 하고 싶은건 버튼을 눌러 주었을때 숫자가 바뀌는 게 목표 😟

이 상태로는 그냥 화면에 0만 떠있고 버튼이 작동하지 않는다.
그렇다면 useState를 사용해서 작동이 되게 하면 될텐데.. 그걸 어디다가 적지?

➡️ App.jsx에 적어줘야 한다 ❗❗❗❗
App의 자식 요소로 `Viewer` 컴포넌트와 `Controller` 컴포넌트가 들어가져있기때문

➡️ App.jsx에 작성해주고 프롭스를 전달해주면 된다.
```jsx
function App() {
  const [count, setCount] = useState(0);

  const onClinckButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>아라의 심플 카운터</h1>
      <section>
        <Viewer count={count}/>
      </section>
      <section>
        <Controller onClickButton={onClinckButton}/>
      </section>
    </div>
  );
}
```
이렇게 적어주면 버튼의 value 값이 count에 더해지게 만들어주고, 아래 컴포넌트에도 전달해준다.
```jsx
const Viewer = ({ count }) => {
  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>{count}</h1>
    </div>
  )
}

export default Viewer;
```
그럼 `Viewer` 컴포넌트에는 `count` 프롭스를 전달해주고, h1 태그 안에도 똑같이 전달

```jsx
const Controller = ({ onClickButton }) => {
  return (
    <div>
      <button onClick={()=>{
        onClickButton(-1);
      }}
      >
        -1</button>
      <button
      onClick={()=>{
        onClickButton(-10);
      }}>-10</button>

      <button onClick={()=>{
        onClickButton(-100);
      }}
      >-100</button>
      <button onClick={()=>{
        onClickButton(+100);
      }}
      >+100</button>
      <button onClick={()=>{
        onClickButton(-10);
      }}
      >+10</button>
      <button onClick={()=>{
        onClickButton(+1);
      }}
      >+1</button>
    </div>
  )
}
```
여기에도 `onClickButton`을 전달해주고 버튼에도 전달을 해줘야하는데 이때,
주의 할 점은 화살표 함수를 이용해서 전달해야한다.

😟**그냥 onClick={onClickButton}를 주면 왜 안되는데?**
버튼 마다의 value 값이 다 다르기 때문에 그렇게 주게 되면 각 버튼이 의미가 없다. 그래서 화살표 함수를 이용해서 전해주는 값까지 전달해줘야 한다❗❗

## 결과물
![](https://velog.velcdn.com/images/whkfk12/post/4cb1d9f0-0417-4551-87f0-33a4e1f4d9bb/image.gif)
