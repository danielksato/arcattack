'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store.jsx';
import Upload from './components/uploadComponent.jsx';
import FileList from './components/fileListComponent.jsx';

class App extends React.Component {

  render(){
    return (
      <div id='app'>
        <h1>Arc Attack Live POC</h1>
        <FileList />
        <Upload />
      </div>
    );
  }
};

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('app'));
