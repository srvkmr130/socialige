import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthSatate } from '../actions/auth';
import { signup, SignupFailed } from '../actions/signup';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthSatate());
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, name, password, confirm_password } = this.state;

    if (password !== confirm_password) {
      this.props.dispatch(
        SignupFailed('Please ensure password and confirm password is same !!')
      );
    } else if (email && password) {
      this.props.dispatch(signup(email, name, password, confirm_password));
    }
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };

  render() {
    const { error, inProgress, isSignedUp } = this.props.signup;
    if (isSignedUp) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Register</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="name"
            placeholder="User Name"
            required
            onChange={this.handleNameChange}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirm_password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Signing up ...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Register
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    signup: state.signup,
  };
}

export default connect(mapStateToProps)(Signup);
