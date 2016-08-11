import React, {Component} from 'react';
import Radium from 'radium';
import {songList} from '../observables/songList.js';

class SongList extends Component {

  constructor () {
    super();
    this.state = {
      songList: [],
      songList$: songList.subscribe((val) => this.setState({songList: val}))
    };
  }

  render () { 
    return (
      <ul>
        {this.state.songList.map((song) => {
          return (
            <li>{song.originalname}</li>
          );
        })}
      </ul>
    );
  }

}

export default Radium(SongList);
