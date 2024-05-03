// In login/actions.ts

import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../store";
import axios from "axios";


// Define action types
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Define action creators
export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = (data: any) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});
export const signupFailure = (error: string) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

// Define async action creator
export const signupUser = (name: string, email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(signupRequest());
    try {
      const data = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://task-management-server-l0pd.onrender.com/registration",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      dispatch(signupSuccess(response.data));
    } catch (error:any) {
      dispatch(signupFailure(error.message));
    }
    //   axios
    //     .request(config)
    //     .then((response) => {
    //       dispatch(signupSuccess(response.data));
         
    //     })
    //     .catch((error) => {
    //       dispatch(signupFailure(error.message));
    //     });
    // } catch (error: any) {
    //   dispatch(signupFailure(error.message));
    // }
  };
};
