
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/trash-2.svg";
import "./main.css";

const Todo = () => {
  const [persons, setPersons] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const toggle = () => setModal(!modal);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (nameValue.trim() && surnameValue.trim()) {
      const newPerson = {
        id: Date.now(),
        name: nameValue,
        surname: surnameValue,
      };
      setPersons([...persons, newPerson]);
      setNameValue("");
      setSurnameValue("");
    }
  };

  const handleNameInputChange = (evt) => {
    setNameValue(evt.target.value);
  };

  const handleSurnameInputChange = (evt) => {
    setSurnameValue(evt.target.value);
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    if (
      selectedPerson &&
      selectedPerson.name.trim() &&
      selectedPerson.surname.trim() 
      
    ) {
      setPersons(
        persons.map((person) =>
          person.id === selectedPerson.id ? selectedPerson : person
        )
      );
      setSelectedPerson(null);
      toggle();
    }
  };

  const handleDelete = (id) => {
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);

      // const personToDelete = persons.find((person) => person.id === id);
      // if (personToDelete.alive) {
      //   const newPersons = persons.filter((person) => person.id !== id);
      //   setPersons(newPersons);
      // }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2 my-5">
            <div className="card mb-3 site-header">
              <div className="card-body ">
                <form className="body-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control site-body-input"
                      name="name"
                      value={nameValue}
                      onChange={handleNameInputChange}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      className="form-control site-body-input"
                      name="surname"
                      value={surnameValue}
                      onChange={handleSurnameInputChange}
                      placeholder="Surname"
                    />
                    {/* <input
                      type="checkbox"
                      id="alive"
                      name="alive"
                      value="alive"
                    /> */}
                    {/* <label for="alive">alive</label>

                    <input type="checkbox" id="died" name="died" value="died" />
                    <label for="died">died</label> */}

                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <h1 className="text-center todo-list">Persons List</h1>
            <div className="row">
              <div className="col-12">
                <ul className="list-group site-list">
                  {persons.map((person) => (
                    <li
                      className="list-group-item site-list d-flex justify-content-between text-align-center align-items-center"
                      key={person.id}
                    >
                      <div className="d-flex text-align-center item-todo site-num">
                        {person.name} {person.surname}
                      </div>
                      <div>
                        <button
                        className="resume-btn"
                          onClick={() => {
                            setSelectedPerson(person);
                            toggle();
                          }}
                        >
                          Resume
                        </button>
                        <button
                          className="btn btn-success me-3"
                          type="button"
                          onClick={() => {
                            setSelectedPerson(person);
                            toggle();
                          }}
                        >
                          <img src={editIcon} alt="edit" />
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDelete(person.id)}
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
        <ModalHeader toggle={toggle}>
          {selectedPerson ? "Edit Person" : "Add Person"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="edit-name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="edit-name"
                value={selectedPerson ? selectedPerson.name : ""}
                onChange={(evt) =>
                  setSelectedPerson({
                    ...selectedPerson,
                    name: evt.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-surname">Surname:</label>
              <input
                type="text"
                className="form-control"
                id="edit-surname"
                value={selectedPerson ? selectedPerson.surname : ""}
                onChange={(evt) =>
                  setSelectedPerson({
                    ...selectedPerson,
                    surname: evt.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-amount">Puli:</label>
              <input
                type="number"
                className="form-control"
                id="edit-amount"
                value={selectedPerson ? selectedPerson.amount : ""}
                onChange={(evt) =>
                  setSelectedPerson({
                    ...selectedPerson,
                    amount: evt.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-field">Soha:</label>
              <input
                type="text"
                className="form-control"
                id="edit-field"
                value={selectedPerson ? selectedPerson.field : ""}
                onChange={(evt) =>
                  setSelectedPerson({
                    ...selectedPerson,
                    field: evt.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-age">Yoshi:</label>
              <input
                type="number"
                className="form-control"
                id="edit-age"
                value={selectedPerson ? selectedPerson.age : ""}
                onChange={(evt) =>
                  setSelectedPerson({
                    ...selectedPerson,
                    age: evt.target.value,
                  })
                }
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleEditSubmit}>
            {selectedPerson ? "Save" : "Add"}
          </button>
          <button className="btn btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Todo;