
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import editIcon from "../../assets/edit.svg"
import deleteIcon from "../../assets/trash-2.svg"
import "./main.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const toggle = () => setModal(!modal);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        value: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    const newTodos = [...todos];
    const todoIndex = selectedTodo.index;
    newTodos[todoIndex].value = selectedTodo.value;
    setTodos(newTodos);
    setSelectedTodo(null);
    toggle();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2 my-5">
            <div className="card mb-3">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="todo"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Add todo"
                    />
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <button className="btn btn-primary" type="button">
                  All
                </button>
                <button className="btn btn-primary mx-3" type="button">
                  Completed
                </button>
                <button className="btn btn-primary" type="button">
                  Uncompleted
                </button>
              </div>
            </div>
            <h1 className="text-center">Todo List</h1>
            <div className="row">
              <div className="col-8 offset-2">
                <ul className="list-group">
                  {todos.map((todo, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between text-align-center align-items-center"
                      key={todo.id}
                    >
                      <div className="d-flex text-align-center item-todo">
                        {index + 1}. &nbsp;
                        <p>{todo.value}</p>
                        &nbsp;
                      </div>
                      <div>
                        <button
                          className="btn btn-success me-3"
                          type="button"
                          onClick={() => {
                            setSelectedTodo({
                              index: index,
                              value: todo.value,
                            });
                            toggle();
                          }}
                        >
                          <img src={editIcon} alt="edit" />
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDelete(todo.id)}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
        <ModalBody>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="edit-todo">Edit Todo:</label>
              <input
                type="text"
                className="form-control"
                id="edit-todo"
                value={selectedTodo ? selectedTodo.value : ""}
                onChange={(evt) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    value: evt.target.value,
                  })
                }
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleEditSubmit}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={toggle}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Todo;