import {BehaviorSubject, Observable} from 'rx';
import {DOM as RxDOM} from 'rx-dom';
import {is, Map, fromJS} from 'immutable';

export const loginSubject = new BehaviorSubject();

export const loginObservable = loginSubject.distinctUntilChanged((x, y) => is(x, y))
  .flatMap((val) => {
    val && val.size && RxDOM.ajax({
      body: JSON.stringify(val.toJS()),
      headers: {'content-type': 'application/json'},
      method: 'PUT',
      url: `http://localhost:3001/${val.get('action')}`
    }).subscribe((val) => loginSubject.onNext(val));
    return Observable.just(Map(val));
});
