import {BehaviorSubject} from 'rx';
import {DOM as RxDOM} from 'rx-dom';
import {PlayQueueSubject$} from './playQueue.js';

export const songListSubject = new BehaviorSubject();

export const SongList$ = songListSubject.flatMap((val) => {
  return RxDOM.ajax({
    method: 'GET',
    responseType: 'json',
    url: 'http://localhost:3001/fileList'
  }).map((res) => res.response).do((res) => PlayQueueSubject$.onNext(res.port));
});

