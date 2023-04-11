import { useEffect, useState } from "react";
import "./App.scss";
import TodoItem from "./components/todo.-item.component";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [label, setLabel] = useState("");
  const [checkClearAll, setCheckClearAll] = useState(true);

  useEffect(() => {
    const existComplete =
      Boolean(todoList.find((todo) => todo.complete == true)) || false;

    if (existComplete) {
      setCheckClearAll(false);
    } else {
      setCheckClearAll(true);
    }
  }, [todoList]);

  const onInputHandler = (event) => {
    setLabel(event.target.value);
  };

  const onClickHandler = () => {
    if (label.length > 0) {
      const id = todoList.length + 1;
      setTodoList([
        ...todoList,
        {
          id,
          label,
          complete: false,
          isEditable: false,
        },
      ]);

      setLabel("");
    }
  };

  const onEnterHandler = (event) => {
    if (event.key == "Enter") {
      onClickHandler();
    }
  };

  const onClearAllHander = () => {
    const todoListIncompelete = todoList.filter(
      (todo) => todo.complete != true
    );
    setTodoList([...todoListIncompelete]);
    setCheckClearAll(true);
  };

  return (
    <>
      <div className="todo-list-container">
        <h1 className="todo-title">Todo</h1>
        <div className="todo-header">
          <input
            type="text"
            placeholder="Create Some Tasks ..."
            onInput={onInputHandler}
            value={label}
            onKeyDown={onEnterHandler}
          />
          <button onClick={onClickHandler}>+</button>
        </div>
        <hr />
        <div className="todo-badgs">
          <span className="blue">All Tasks : 3</span>
          <span className="pink">Incomplete : 1</span>
          <span className="green">Complete : 3</span>
        </div>
        <hr />
        <ul className="todo-list">
          {todoList.length > 0 &&
            todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todoList={todoList}
                setTodoList={setTodoList}
                setCheckClearAll={setCheckClearAll}
                checkClearAll={checkClearAll}
              />
            ))}
        </ul>
        <hr />
        <div className="todo-footer">
          <button disabled={checkClearAll} onClick={onClearAllHander}>
            Clear Completed Tasks
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
