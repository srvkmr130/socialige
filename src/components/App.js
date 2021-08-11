import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Home, Navbar, Error404, Login, Signup, Settings } from './'; // will import from index.js
import { authenticateUser } from '../actions/auth';

// Settings is a Functional Component
// const Settings = () => {
//   <div>Settings</div>;
// };

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="login" />;
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      const user = jwt_decode(token);
      console.log('user', user);
      this.props.dispatch(authenticateUser(user));
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
                // Here {...props} will spread into( location:{location} history :{histoy} etc)
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              isLoggedin={auth.isLoggedin}
              path="/settings"
              component={Settings}
            />
            {/* <Route exact path="/" component={Home} />
                <Route exact path="/" component={Home} /> 
            */}
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
