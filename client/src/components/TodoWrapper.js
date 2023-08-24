import React, { Fragment } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Navbar from "./Navbar";
import { connect } from "react-redux";

const TodoWrapper = ({todo:{todos}}) => {
  return (
    <Fragment>
      <Navbar />
      <div className="TodoWrapper">
        <h1>Get Things Done !</h1>
        <p>You have {todos.length} todo left</p>
        <TodoForm />
        <Todo />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  todo: state.todo
})

export default connect(mapStateToProps)(TodoWrapper)