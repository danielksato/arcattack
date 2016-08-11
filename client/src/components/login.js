import React, {Component} from 'react';
import {Map} from 'immutable';
import Radium from 'radium';
import UserForm from './userForm.js';

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visibleComponent: null,
    };
  }

  get styles () {
    return {
      button: {
        backgroundColor: '#444',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        color: '#F7F7FF',
        fontSize: 16,
        margin: 10,
        padding: 5
      },
      buttons: {
        display: this.state.visibleComponent ? 'none' : 'inherit'
      },
      container: {
        display: 'block',
        marginTop: 20,
        textAlign: 'center'
      }
    }

  }

  login (e) {
    e.preventDefault();
    this.setState({visibleComponent: 'login'});
  }

  register (e) {
    e.preventDefault();
    this.setState({visibleComponent: 'register'});
  }

  renderUserForm () {
    return <UserForm {...this.props} visibleComponent={this.state.visibleComponent} />
  }

  render () {
    return (
      <div style={this.styles.container}>
        <form style={this.styles.buttons} onSubmit={(val) => console.log(val)}>
          <button style={this.styles.button} onClick={(e) => this.login(e)}>Login</button>
          <button style={this.styles.button} onClick={(e) => this.register(e)}>Register</button>
        </form>
        {this.renderUserForm()}
      </div>
    );
  }
}

export default Radium(Login);
