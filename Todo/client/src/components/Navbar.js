import React from "react";
import logo from "./img/todo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, user } }) => {
  return (
    <div className="Navbar">
      <img className="logo" src={logo} alt="" />
      {isAuthenticated && <h3>Welcome {user.name.trim().split(" ")[0]}</h3>}
      <ul>
        <li>
          <a onClick={logout} href="#!">
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span>Quit</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
