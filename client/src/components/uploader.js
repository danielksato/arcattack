import React, {Component} from 'react';
import Radium from 'radium';
import {uploadSubject, uploadObservable} from '../observables/upload.js';
import {songListSubject} from '../observables/songList.js';

class Uploader extends Component {

  constructor () {
    super();
    this.state = {
      songListSubject,
      uploadSubject,
      uploadObservable: uploadObservable.subscribe((res) => this.state.songListSubject.onNext())
    };
  }

  componentWillUnmount () {
    this.state.uploadObservable.dispose()
  }

  submitFile (e) {
    this.state.uploadSubject.onNext({
      data: this.props.userData,
      file: this.uploader.files[0]
    });
  }

  render () {
    return (
      <div>
          <span>Upload a File</span>
          <input
            onChange={() => this.submitFile()}
            ref={(el) => this.uploader = el}
            type='file' />
      </div>

    );
  } 

}

export default Radium(Uploader);
