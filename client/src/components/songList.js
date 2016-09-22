import React, {Component} from 'react';
import Radium from 'radium';
import {SongList$} from '../observables/songList.js';
import {PlayQueue$} from '../observables/playQueue.js'

class SongList extends Component {

  constructor () {
    super();
    this.state = {
      songList: [],
      songList$: SongList$.subscribe((val) => this.setState({songList: val.list})),
      playQueue$: PlayQueue$.subscribe((val) => {
        this.setState({songList: JSON.parse(val.data).list})
      })
    };
  }

  componentWillUnmount () {
    this.state.songList$.dispose();
    this.state.playQueue$.dispose();
  }

  render () { 
    return (
      <ul>
        {this.state.songList.map((song, index) => {
          return (
            <li key={index}>{song.originalname}</li>
          );
        })}
      </ul>
    );
  }

}

export default Radium(SongList);
