> 오늘 만들어 볼 건 React를 사용 한 투드리스❗
보통 처음에 리액트를 배우면 카운트 앱과 투두리스트를 통해서
기능 구현을 연습한다고 하는데 저번에 카운트 앱을 만들었으니까,
CRUD가 가능한 투두리스트를 만들어 보겠다 😊

## UI를 구성 해보자

강의를 보고 만드는 거기때문에 
완성 본이 있지만 그래도 그 틀안에서 CSS를 해봤당_(ㅎㅎㅎㅎㅎㅎㅎ)_

![](https://velog.velcdn.com/images/whkfk12/post/31462933-ca03-41f9-bc32-2c8530eb681f/image.png)

이렇게 초록초록하게 〰️〰️〰️💚

✅ 일단 오늘 할 일을 입력 할 수 있는 input
✅ 투두리스트를 검색 할 수 있는 검색 input
✅ 리스트를 추가하는 버튼 / 삭제하는 버튼
✅ 한 일을 체크할 수 있는 체크박스

로 간단한 구성의 UI를 구현해주었다 ❗


## 리스트를 추가 할 수 있게 해줘😣

```jsx
function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
```
💡
**`useRef`를 이용해서 id값을 생성**하게 만들어 주었고, 하지않았다가 기본값(false)
기존에 있는** todos는 변동하면 안되기 때문에 `spread operator`를 사용**해주었다.
그리고 todos의 기본 리스트를 만들어주기위해서 mockData도 만들어 주었다.
```jsx
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "종이랑 놀기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];
```
 `const [todos, setTodos] = useState(mockData);` 만들어주기 💚
 
 ## 리스트를 업데이트/삭제 해줘😯
 
```jsx
const onUpdate = (targetId) => {
    //todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone을 변경

    //인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 
    //데이터만 딱 바꾼 새로운 배열
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

const onDelete = (targetId) => {
    //인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo)=>todo.id !== targetId));
  };
```
+ 리스트 업데이트
배열 메서드인 `map`을 사용해서 기존 배열에서 새로운 배열을 만들어 주기❗
그 뒤에 리스트와 에디터 컴포넌트에서 props를 전달해주고,기능을 구현 해줬다.

+ 리스트 삭제
삭제는 기존 배열과 길이가 같지 않아도 되니까 `filter`를 사용해서 새로운 배열을 만들어주는 방법을 선택했다 ❗

_(( 여기에서 내가  2024 파리 올림픽 메달 트래커 만들때 index로 주고 삭제를 했는데 id를 만들어서 지워주면 되겠구나 했다.. ))_

**App.jsx만 바꿔주면 될까 ? 당연히 아니지 😣**
```jsx
const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) =>{
    if(e.keyCode === 13) {
      onSubmit();
    }
  };
  
  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };
  return (
    <div className="Editor">
      <input
      ref={contentRef}
        placeholder="오늘은 무슨 일을 할꺼야?"
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeydown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};
```
추가 버튼을 눌러주면 `onSubmit` 이 작동하고 ➡️ 이어서 `setContent`/` onCreate`작동 
(( 저기에서 useRef는 사용자의 가시성을 위해서 비어있을때 추가 버튼을 누르면 포커스되도록 넣어주기만 한 것 ))

```jsx
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
```
여기서도 props 전부 넘겨 받고 _(이제 프롭스 개념 어렵지 않지 !)_
대신 신경 쓴 부분은 체크 박스 부분이 체크가 안되고 읽는 것만 가능했다.
**이 부분의 에러를 해결 하기 위해서! 
➡️ ` const onChangeCheckbox = () => {onUpdate(id)};`**


## 완성 된 결과물 

![](https://velog.velcdn.com/images/whkfk12/post/36fd8186-41df-4968-8a57-f3b04b2e88e7/image.gif)



<hr>

이걸 만들면서 내가 부족하다고 느낀 개념 😣
+ useRef를 내가 어느 경우에 꺼내서 써야 할 지 아직 어렵다

만들면서 내가 확실히 아는 개념 😊
+ props, state 개념
+ 삭제와 업데이트 시 사용하는 배열메서드 원리





