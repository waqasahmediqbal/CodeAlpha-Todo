import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getTodos, deleteTodo, editTodo } from "../actions/todo";
import { connect } from "react-redux";
import Loading from "./Loading";

const Todo = ({ getTodos, deleteTodo, editTodo, todo: { todos, loading } }) => {
  const [text, setEditedText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (todoId) => {
    if (editingId === todoId) {
      // Save the edited text
      editTodo({ text: text },todoId);
      setEditingId(null);
    } else {
      setEditingId(todoId);
      // Initialize edited text with the current todo text
      setEditedText(todos.find((todo) => todo._id === todoId).text);
    }
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
    await getTodos();
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`Todo ${editingId === todo._id ? "editing" : ""}`}
        >
          {editingId === todo._id ? (
            <div>
              <input
                type="text"
                value={text}
                onChange={(e) => setEditedText(e.target.value)}
                className="todo-input"
                style={{marginBottom:0,marginTop:0}}
              />
              <button className="todo-btn" style={{marginBottom:0,marginTop:0}} onClick={() => handleEdit(todo._id)}>Save</button>
            </div>
          ) : (
            <>
              <p>{todo.text}</p>
              <div>
                <FontAwesomeIcon
                className="fa-edit"
                  icon={faPenToSquare}
                  onClick={() => handleEdit(todo._id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos, deleteTodo, editTodo })(
  Todo
);
