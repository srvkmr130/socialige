import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Home, Navbar, Error404, Login, Signup } from './'; // will import from index.js

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      const user = jwt_decode(token);
      console.log('user', user);
    }
  }

  render() {
    const { posts } = this.props;
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
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
