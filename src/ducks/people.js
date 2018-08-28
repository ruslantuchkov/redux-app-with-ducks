import { appName } from '../config';
import { Record, List } from 'immutable';
import { put, call, takeEvery } from 'redux-saga/effects';
import { generateId } from './utils';

export const moduleName = 'people';

const ReducerRecord = Record({
  entities: new List([])
});

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
});

//ACTION_TYPES
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;

//REDUCER
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', entities =>
        entities.push(new PersonRecord(payload))
      );

    default:
      return state;
  }
}

//ACTION_CREATORS
export const addPerson = person => ({
  type: ADD_PERSON_REQUEST,
  payload: person
});

//SAGAS
export const addPersonSaga = function*(action) {
  const id = yield call(generateId);

  yield put({
    type: ADD_PERSON,
    payload: { id, ...action.payload }
  });
};

export const saga = function*() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
};
