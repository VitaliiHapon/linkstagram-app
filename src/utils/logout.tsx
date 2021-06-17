import PropTypes from "prop-types";
import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { deleteLoginToken } from "./auth";


class LogoutPage extends Component {

  componentWillMount() {
    deleteLoginToken();
  }

  render() {
    return (
      <Redirect to="/login" />
    );
  }

}

export default LogoutPage;