import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
      message: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId); // here we are grabbing all the friends using map () in a new array . FRom this array we are finding the indexOf userId

    if (index !== -1) return true;
    else return false;
  };

  // here we directly use action in component level
  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId; // this gets the userId which is passed as param in the route link.
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        message: 'Friend added successfully',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({ success: null, error: data.message });
    }
  };

  handleRemoveFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.removeFriend(userId);

    const removeOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, removeOptions);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        message: 'Friend removed successfully',
      });
      console.log('Remove frnd data', data);
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({ success: null, error: data.message });
    }
  };
  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;
    console.log('User', user);
    console.log('this.props', params);

    if (profile.inProgress) {
      return <h1>Loading ....</h1>;
    }

    const { success, error, message } = this.state;
    const isUserIsAFriend = this.checkIfUserIsAFriend();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserIsAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}
          {success && <div className="alert success-dailog">{message}</div>}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
