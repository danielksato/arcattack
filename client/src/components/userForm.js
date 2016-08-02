import React, {Component} from 'react';
import {Map} from 'immutable';
import Radium from 'radium';

class UserForm extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  get styles () {
    return {
      loginForm: {
        display: this.props.visibleComponent ? 'inline-block' : 'none',
        textAlign: 'center',
        width: '100%'
      },
      loginInput: {
        margin: 5
      },
      submitButton: {
        // visibility: 'hidden'
        // media query to hide on desktop only
      }
    };
  }

  renderUserInfo () {
    if (this.props.visibleComponent === 'login') {
      return (
        <input
          style={this.styles.loginInput}
          type="text"
          value={this.state.username}
          onChange={(e) => this.setState({username: e.target.value})}
          placeholder="username" />
      );
    } else {
      return (
        <div>
          <input
            style={this.styles.loginInput}
            type="text"
            value={this.state.username}
            onChange={(e) => this.setState({username: e.target.value})}
            placeholder="username" />
          <input
            style={this.styles.loginInput}
            type="text"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            placeholder="email" />
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <form
          style={this.styles.loginForm}
          onSubmit={(e) => {
            e.preventDefault();
            const {username, password, email} = this.state;
            const {visibleComponent} = this.props;
            this.props.loginSubject.onNext(Map({
              username,
              password,
              email,
              action: visibleComponent
            }));
          }}>
          {this.renderUserInfo()}
          <input
            style={this.styles.loginInput}
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
            placeholder="password" />
          <input
            style={[this.styles.button, this.styles.submitButton]}
            type="submit" />
        </form>
        <p>Login with FB TK</p>
      </div>
    );
  }
}

export default Radium(UserForm);
