import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from "../Loading";

const Register = ({ register, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name: name, email: email, password: password });
  };
  if (loading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Register">
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            className="input"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className="input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength={6}
            onChange={(e) => onChange(e)}
            className="input"
          />
        </div>
        <p style={{ marginBottom: "1rem" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <button type="submit" className="todo-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { register })(Register);
