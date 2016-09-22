import {Subject} from 'rx';
import {DOM as RxDOM} from 'rx-dom';
// import io from 'socket.io-client';

// window.WebSocket = io;

export const PlayQueueSubject$ = new Subject();

// export const PlayQueue$ = PlayQueueSubject$.flatMap((port) => {
//   return RxDOM.fromWebSocket(`ws://${location.hostname}:${port}`);
// });
export const PlayQueue$ = RxDOM.fromWebSocket('ws://localhost:3001', null);
