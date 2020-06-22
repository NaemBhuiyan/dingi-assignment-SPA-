import { CHANGE } from '../actions';

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case CHANGE:
      return !state;
    default:
      return false;
  }
};

export default loggedReducer;
