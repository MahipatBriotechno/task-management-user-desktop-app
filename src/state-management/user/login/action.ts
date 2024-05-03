
import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../../store";
import axios from "axios";


// Define action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Define action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Define async action creator
export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://task-management-server-l0pd.onrender.com/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          dispatch(loginSuccess(response.data));
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
        });
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };
};


// ============
 export const logoutUser = () => ({
  type: 'LOGOUT_USER',
 });