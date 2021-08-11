import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthSatate, login } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    // Form Handling - Uncontrolled component . we are using reference .
    // Uncontrolled because the state resides in DOM not in React State.
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthSatate());
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
    // console.log('this.emailInputRef', this.emailInputRef);
    // console.log('this.passwordInputRef', this.passwordInputRef);
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } }; // If state is not null or directly route to home component

    if (isLoggedin) {
      return <Redirect to={from} />;
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
            // ref={this.emailInputRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
            // ref={this.passwordInputRef}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
