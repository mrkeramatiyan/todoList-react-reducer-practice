import { useState } from "react";

const TodoItem = ({ todo, todoList, setTodoList }) => {
  const { id, label, complete, isEditable } = todo;

  const [newLabel, setnewLabel] = useState(label);

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

  const onEditHandler = (event) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
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

  const onChangeInputHandler = (event) => setnewLabel(event.target.value);

  const makeNewTodoListHelper = (newLabel) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          label: newLabel || label,
          isEditable: false,
        };
      } else {
        return todo;
      }
    });

    setTodoList(newTodoList);
  };

  const onKeyDownHandler = (event) => {
    const key = event.key;
    if (key == "Enter") {
      makeNewTodoListHelper(newLabel);
    } else if (key == "Escape") {
      makeNewTodoListHelper();
    }
  };

  const onRemoveHandler = () => {
    const newTodoList = todoList.filter((todo) => todo.id != id);
    setTodoList(newTodoList);
  };

  return (
    <li className="list-item">
      <div className="wrapper-input">
        <input
          type="checkbox"
          id={`label${id}`}
          todo-id={id}
          onChange={onChangeCheckHandler}
          checked={complete}
        />
        {isEditable ? (
          <input
            type="text"
            todo-id={id}
            value={newLabel}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownHandler}
          />
        ) : (
          <label htmlFor={`label${id}`} className={complete ? " checked" : ""}>
            {label}
          </label>
        )}
      </div>
      <div className="wrapper-button">
        <button className="edit" onClick={onEditHandler}>
          edit
        </button>
        <button className="remove" onClick={onRemoveHandler}>
          x
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
