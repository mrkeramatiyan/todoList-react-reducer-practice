import { useState } from "react";
import "./App.scss";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [label, setLabel] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const onInputHandler = (event) => setLabel(event.target.value);

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

  const onChangeCheckHandler = (event) => {
    const todoId = event.target.getAttribute("todo-id");

    const updateTodoList = todoList.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      } else {
        return todo;
      }
    });
    setTodoList([...updateTodoList]);
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
  };

  const onEditHandler = (event) => {
    const todoId = event.target.getAttribute("todo-id");

    setNewLabel(todoList.find((todo) => todo.id == todoId).label);

    const newTodoList = todoList.map((todo) => {
      if (todo.id == todoId) {
        return {
          ...todo,
          isEditable: true,
        };
      } else {
        return todo;
      }
    });

    setTodoList([...newTodoList]);
  };

  const onChangeEditInputHandler = (event) => {
    const todoId = event.target.getAttribute("todo-id");
    const findLabel = todoList.find(todo => todo.id == todoId).label;
    setNewLabel(findLabel);
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
            todoList.map(({ id, label, complete, isEditable }) => (
              <li className="list-item" key={id}>
                <div className="wrapper-input">
                  <input
                    type="checkbox"
                    id={`label${id}`}
                    todo-id={id}
                    onChange={onChangeCheckHandler}
                    checked={complete}
                  />
                  {isEditable ? (
                    <input type="text" todo-id={id} value={newLabel} onChange={onChangeEditInputHandler} />
                  ) : (
                    <label
                      htmlFor={`label${id}`}
                      className={complete ? "checked" : ""}
                    >
                      {label}
                    </label>
                  )}
                </div>
                <div className="wrapper-button">
                  <button className="edit" todo-id={id} onClick={onEditHandler}>
                    edit
                  </button>
                  <button className="remove" todo-id={id}>
                    x
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <hr />
        <div className="todo-footer">
          <button onClick={onClearAllHander}>Clear Completed Tasks</button>
        </div>
      </div>
    </>
  );
}

export default App;
