// In login/reducer.ts

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action';


interface LoginState {
  loading: boolean;
  error: string;
  data: any;
  isLoggedIn:boolean;
}

const initialState: LoginState = {
  loading: false,
  error: '',
  data: null,
  isLoggedIn: false
};



export const loginReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: '', isLoggedIn: true };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case 'LOGOUT_USER': // 11
      return { ...state, loading: false, isLoggedIn: false };
    default:
      return state;
  }
};