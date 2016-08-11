import {BehaviorSubject} from 'rx';
import {DOM as RxDOM} from 'rx-dom';

export const songListSubject = new BehaviorSubject();


export const songList = songListSubject.flatMap((val) => {
  return RxDOM.ajax({
    method: 'GET',
    responseType: 'json',
    url: 'http://localhost:3001/fileList'
  }).map((res) => res.response);
});

