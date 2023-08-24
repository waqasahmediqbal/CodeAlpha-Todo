import {
  DELETE_TODO,
  GET_TODOS,
  POST_TODO,
  TODO_ERROR,
  UPDATE_TODO,
} from "../actions/types";

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case GET_TODOS:
    case UPDATE_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
