import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
import Navbar from "./Components/Navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    const todo = await addTodo({
      title: newTodo,
      description: newDescription,
      status: false,
    });
    setTodos([...todos, todo]);
    setNewTodo("");
    setNewDescription("");
  };

  const handleToggleTodo = async (todo) => {
    const updatedTodo = { ...todo, status: !todo.status };
    await updateTodo(todo.id, updatedTodo);
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
    setEditingDescription(todo.description);
  };

  const handleSaveEdit = async (id) => {
    const updatedTodo = {
      title: editingTitle,
      description: editingDescription,
    };
    await updateTodo(id, updatedTodo);
    setEditingTodoId(null);
    setEditingTitle("");
    setEditingDescription("");
    fetchTodos();
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h1 className="text-center mb-4">To-Do List</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Task Title"
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Task Description"
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAddTodo}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "60px" }}>Status</th>
              <th>Title</th>
              <th>Description</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={todo.status}
                    onChange={() => handleToggleTodo(todo)}
                    style={{ transform: "scale(1.5)" }}
                  />
                </td>
                <td>
                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: todo.status ? "line-through" : "none",
                        color: todo.status ? "#6c757d" : "inherit",
                      }}
                    >
                      {todo.title}
                    </span>
                  )}
                </td>
                <td>
                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                    />
                  ) : (
                    <span
                      style={{ color: todo.status ? "#6c757d" : "inherit" }}
                    >
                      {todo.description}
                    </span>
                  )}
                </td>
                <td>
                  {editingTodoId === todo.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSaveEdit(todo.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditTodo(todo)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
