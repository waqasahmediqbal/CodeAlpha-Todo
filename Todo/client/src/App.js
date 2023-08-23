import "./App.css";
import React, { useEffect } from "react";
import TodoWrapper from "./components/TodoWrapper";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import { Routes, Route } from "react-router-dom";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./PrivateRoute";
import Alert from "./components/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
       <Alert/> 
        <Routes>
          <Route path="/" element={<PrivateRoute component={TodoWrapper} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
