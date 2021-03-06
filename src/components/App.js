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
import {
  Home,
  Navbar,
  Error404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './'; // will import from index.js
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

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
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          // here we want to pass location of the current path in props , say we route to Settings and user is not logged in.Then first user will see Login component and we also pass location of settings to LOgin component as props so that Login can redirect to settings component
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    console.log('token', token);
    if (token) {
      const user = jwt_decode(token);
      console.log('user', user);
      this.props.dispatch(authenticateUser(user));

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
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
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
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
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
