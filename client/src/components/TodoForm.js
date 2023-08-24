import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addTodo, getTodos } from "../actions/todo";

const TodoForm = ({ addTodo, getTodos }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    // prevent default action
    e.preventDefault();
    if (text) {
      // add todo
      await addTodo({ text });

      // clear form after submission
      setText("");
    }
    await getTodos();
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default connect(null, { addTodo, getTodos })(TodoForm);
