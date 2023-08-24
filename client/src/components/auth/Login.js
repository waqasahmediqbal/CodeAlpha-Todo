import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Loading from "../Loading";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  // Redirect if Logged in
  if (loading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Register">
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Sign In</h1>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
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
            required
            value={password}
            onChange={(e) => onChange(e)}
            className="input"
          />
        </div>
        <p style={{ marginBottom: "1rem" }}>
          Don't Have an Account? <Link to="/register">Register</Link>
        </p>
        <button type="submit" className="todo-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { login })(Login);
