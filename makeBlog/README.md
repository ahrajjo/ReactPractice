> 이번 목표는 내가 알고 있는 리액트 기초 문법을 통해서 엄청 간단한 블로그를 제작하는 것 😊 

**구현 할 기능**
+ mock data의 게시글이 처음 화면에 구현되는 것
+ 게시글의 제목을 눌렀을때 아래에 모달이 뜨는 것
 ㄴ 모달의 글 수정 버튼을 누르면 제목이 변하게 만들어주기
+ 좋아요 버튼을 눌렀을 때 카운트가 올라가는 것
+ 글 발행하기 버튼을 눌렀을때 새로운 게시글이 제일 위에 추가되는 것
+ 삭제를 눌렀을 때 글이 삭제 되는 것


차례대로 한 번 구현 해보자 ❗❗❗❗

# mock data 화면 구현
```jsx
//일단 mock data는 이렇게 네가지를 설정
const mockData = [
  "조아라 React 장인이 될 수 있을까",
  "빼빼로 데이의 유래",
  "State와 props의 관계",
  "독학의 정석"
];

function App() {
  const [title, setTitle] = useState(mockData);
  
  return (
    <>
      <div className="App">
        <div className="pink-nav">
          <h4>whkfk12.log</h4>
        </div>
          return (
            <div className="list">
              <h4> {title}</h4>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
    </>
  );
}
```
💡
useState를 이용해서 제목과 제목을 변경하는 함수를 구조분해할당 해줬다.

➡️ 제목 부분에 state `{title}`를 써주고 
➡️ 발행일은 현재 날짜를 적어주기 위해서 `new Date().toLocaleDateString()`를 사용

그러면 화면에 이제 내가 넣어준 데이터를 토대로 제목과 발행일이 나타난다.

# 글 제목 클릭 -> 모달 띄우기
누르는 글 제목에대한 모달이 뜨기 (누르는 제목에 맞게)
그리고 글 수정 버튼을 눌렀을때 제목 변경 구현하기
```jsx
function Modal({ title, setTitle, changeTitle }) {
  return (
    <>
      <div className="modal">
        <h4>{title[changeTitle]}</h4>
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
  const [modal, setModal] = useState(false);
  const [changeTitle, setChangeTitle] = useState(0);

  
   {title.map((a, i) => {
          return (
            <div className="list" key={i}>
              <h4
                onClick={() => {
                  setModal(true);
                  setChangeTitle(i);
                }}
              >
                
    {modal === true ? (
          <Modal title={title} setTitle={setTitle} ChangeTitle={ChangeTitle} />
        ) : null}
```

일단 모달 창을 띄우는 방법은,

➡️ useState로 modal의 초기값을 false로 주고
➡️ 삼항연산자를 통해서 true라면 그대로 가져와주게 만들고 그게 아니라면 null로 조건을 만들어주었다.

그리고 제목대로 모달이 뜨게하는 방법은

➡️ useState로 `  const [changeTitle, setChangeTitle] = useState(0);`
➡️ Modal 컴포넌트 안에 props로 전달해주고
➡️ 클릭을 하면 모달이 true로 바뀌고 `setChangeTitle(i)` 클릭되는 해당 인덱스가 실행되게 만들어 준 뒤에 
➡️ `{title[changeTitle]}` 해주었다 😊

여기에서 주의 해야 할 점은
```jsx
 <button
          onClick={() => {
            let copy = [...title];
            copy[0] = "당연히 될 수 있지";
            setTitle(copy);
          }}
        >
          글수정
        </button>
```
⚠️
전개 구문을 사용해서 title의 복사본을 만들어 줘야 한다는 것
그렇지 않으면 원본이 훼손되기 때문이다

# 좋아요 카운트
```jsx

function App() {
  const [title, setTitle] = useState(mockData);
  const [count, setCount] = useState([0, 0, 0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [ChangeTitle, setChangeTitle] = useState(0);

   return (
    <>
      <div className="App">
        <div className="pink-nav">
          <h4>whkfk12.log</h4>
        </div>
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
                </div>
              </h4>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
```
같은 방식으로
➡️ useState로 `const [count, setCount] = useState([0, 0, 0, 0, 0]);`
**어 근데 왜 빈 0으로 배열을 만들어서 넣어준거야? 🤔**
: 안그러면 하나의 좋아요를 누르게되면 다른 좋아요까지 동시에 카운트가 올라가! 

➡️ 그 뒤에 state `count`가 올라갈 수 있게 `setCount`를 설정
**이렇게만 해주면 이벤트 버블링이 발생해서 자꾸 모달창이 켜지는 문제 발생**
**catch 💚**

➡️ ` e.stopPropagation();` 사용해서 이벤트 버블링을 방지

# 글 발행하기 / 글 삭제하기
```jsx
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
```
일단 두가지 함수를 만들어 주었다 : `onCreate/onDelete`

➡️ 조건문을 사용해서 input된 값이 있으면 기존값의 변동을 막기 위해서 전개 구문을 사용해주고 추가 해주는 방식으로 했다.

➡️ 삭제도 해당하는 것만 삭제되고 다른 게시물들은 변화가 없기위해서 전개 구문을 사용했다. 여기서 사용한 `splice`로 해당하는 인덱스만 지워주고 실행하도록 변수를 선언 해주었다.

# 그렇게 완성 된 결과물
![](https://velog.velcdn.com/images/whkfk12/post/0deadaeb-cfb0-41ae-affe-87ddaa09907f/image.gif)

<hr>

