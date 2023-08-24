import axios from "axios";
import { DELETE_TODO, GET_TODOS, POST_TODO, TODO_ERROR, UPDATE_TODO } from "./types";
import { setAlert } from "./alert";

export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/todos");
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addTodo = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/todos", formData, config);
    dispatch({
      type: POST_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editTodo = (formData, todoId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/todos/${todoId}`, formData, config);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
    dispatch(setAlert("Task Updated", "light"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/todos/${todoId}`);
    dispatch({
      type: DELETE_TODO,
      payload: res.data,
    });
    dispatch(setAlert("Task deleted", "dark"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
