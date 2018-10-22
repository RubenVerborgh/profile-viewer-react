import React from 'react';
import { LoggedIn, LoggedOut, AuthButton, Value, List, withWebId } from '@solid/react';
import './App.css';

class App extends React.Component {
  state = { profileInput: '', activeProfile: '' };

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId)
      this.setState({ profileInput: webId });
  }

  viewProfile(profile) {
    this.setState({ profileInput: profile, activeProfile: profile });
  }

  render() {
    const { profileInput, activeProfile } = this.state;
    return (
      <div>
        <h1>Profile viewer</h1>
        <p>
          <LoggedOut>You are not logged in.</LoggedOut>
          <LoggedIn>You are logged in as <Value src="user.name"/>.</LoggedIn>
          <AuthButton popup="popup.html"/>
        </p>
        <p>
          <label htmlFor="profile">Profile:</label>
          <input id="profile" value={profileInput}
                 onChange={e => this.setState({ profileInput: e.target.value })}/>
          <button onClick={() => this.viewProfile(profileInput)}>View</button>
        </p>
        {activeProfile &&
        <dl>
          <dt>Full name</dt>
          <dd><Value src={`[${activeProfile}].name`}/></dd>
          <dt>Friends</dt>
          <dd>
            <List src={`[${activeProfile}].friends`}>{friend =>
              <li key={friend}>
                <button onClick={() => this.viewProfile(friend)}>
                  <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                </button>
              </li>}
            </List>
          </dd>
        </dl>}
      </div>
    );
  }
}
export default withWebId(App);
