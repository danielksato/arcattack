import React from 'react';
import store from '../store/store.jsx';

export default class Upload extends React.Component {

  onSubmit(e) {
    console.log(e);
  }

  render () {
    return (
      <div>
        <input type="file" onSubmit={(e) => this.onSubmit(e)} />
      </div>
    );
  }
}
