import { useContext, useState } from "react";
import { TodoContext } from "../todo.context";

const TodoItem = ({ todo }) => {
  const { id, label, complete, isEditable } = todo;

  const {
    removeTaskFromTodoList,
    toggleEditableTaskInTodoList,
    toggleTaskCompleteCheck,
    changeLabelAndUpdateTodoList,
  } = useContext(TodoContext);

  const [newLabel, setnewLabel] = useState(label);

  const onChangeCheckHandler = () => toggleTaskCompleteCheck(id);

  const onEditHandler = () => toggleEditableTaskInTodoList(id);

  const onChangeInputHandler = (event) => setnewLabel(event.target.value);

  const onKeyDownHandler = (event) => {
    const key = event.key;
    if (key == "Enter") {
      changeLabelAndUpdateTodoList(id, newLabel);
    }
    else if (key == "Escape") {
      changeLabelAndUpdateTodoList(id);
    }
  };

  const onRemoveHandler = () => removeTaskFromTodoList(id);

  return (
    <li className="list-item">
      <div className="wrapper-input">
        <input
          type="checkbox"
          id={`label${id}`}
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
          <label htmlFor={`label${id}`} className={complete ? "checked" : ""}>
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
