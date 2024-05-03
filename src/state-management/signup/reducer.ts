// In login/reducer.ts

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './action';


interface SignupState {
  loading: boolean;
  error: string;
  data: any;

}

const initialState: SignupState = {
  loading: false,
  error: '',
  data: null,

};

export const signupReducer = (state = initialState, action: any): SignupState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: '' };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: '' };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
     
    default:
      return state;
  }
};
