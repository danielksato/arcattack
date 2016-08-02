import React, {Component} from 'react';
import Radium from 'radium'
import logo from './logo.svg';
import './App.css';
import {loginSubject, loginObservable} from './observables/login.js';
import Login from './components/login.js';
// import Main from './components/login.js';

let styles = {
  header: {
    backgroundColor: '#003366',
    color: '#F7F7FF',
    display: 'inline-flex',
    height: 200,
    textAlign: 'center',
    width: '100%'
  },
  title: {
    alignSelf: 'center',
    width: '100%'
  }
}

class App extends Component {

  constructor () {
    super();
    this.state = {
      loginSubject,
      loginData: null,
      loginObservable: loginObservable.subscribe((val) => {
        val && this.setState({loginData: val});
      })
    };
  }

  renderLogin () {
    if (!this.state.loginData) {
      return <Login {...this.state} />;
    } else return null;
  }

  renderMain () {
    if (this.state.loginData) {
      return <div><h2>{this.state.loginData.get('username')}</h2></div>;
    } else return null;
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <h2 style={styles.title}>Arc Attack Streaming POC</h2>
        </div>
        {this.renderLogin()}
        {this.renderMain()}
      </div>
    );
  }
}

export default Radium(App);
