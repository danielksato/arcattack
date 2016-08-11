import {Subject} from 'rx';
import {DOM as RxDOM} from 'rx-dom';
// import {is, Map, fromJS} from 'immutable';

function buildFormData (data) {
  const formData = new FormData();
  formData.set('file', data.file);
  formData.set('data', JSON.stringify(data.data));
  return formData;
}

export const uploadSubject = new Subject();

export const uploadObservable = uploadSubject.flatMap((val) => {
  return RxDOM.post({
    url: 'http://localhost:3001/upload',
    body: buildFormData(val)
  });
});
