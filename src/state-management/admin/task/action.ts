import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../../store";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUserTasks } from "../../user/userTask/actions";

export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const ADD_TASK_REQUEST = "ADD_TASK_REQUEST";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE";

export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const FETCH_SINGLE_TASK_REQUEST = "FETCH_SINGLE_TASK_REQUEST";
export const FETCH_SINGLE_TASK_SUCCESS = "FETCH_SINGLE_TASK_SUCCESS";
export const FETCH_SINGLE_TASK_FAILURE = "FETCH_SINGLE_TASK_FAILURE";

export const tasksList = () => async (dispatch: any) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks`);
    const data = await response.json();
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

export const addTask = (taskData: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/addTask`,
      taskData
    );
    dispatch({ type: ADD_TASK_SUCCESS, payload: response.data });
    toast.success(response.data.message, {
      autoClose: 3000,
    });
    dispatch(tasksList());
  } catch (error: any) {
    dispatch({ type: ADD_TASK_FAILURE, payload: error.data.message });
    toast.error(error.data.message);
  }
};

export const updateTask = (
  taskid: string,
  title: string,
  empId: string,
  empName: string,
  status: string,
  assignDate: string,
  submissionDate: string,
  startTime: string,
  endTime: string,
  totalTimeDuration: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: UPDATE_TASK_REQUEST });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateTask`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskid,
            title,
            empId,
            empName,
            status,
            assignDate,
            submissionDate,
            startTime,
            endTime,
            totalTimeDuration,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
        toast.success(data.message, {
          autoClose: 2000,
        });
        // dispatch(tasksList());
        // dispatch(fetchUserTasks(empId));
      } else {
        dispatch({ type: UPDATE_TASK_FAILURE, payload: data.message });
        toast.error(data.message);
        toast.success("Task update err");
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      dispatch({ type: UPDATE_TASK_FAILURE, payload: "Something went wrong" });
    }
  };
};

export const updateUserTask = (
  taskid: string,
  date: string,
  title: string,
  empName: string,
  empId: string,
  status: string,
  submissionDate: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: UPDATE_TASK_REQUEST });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateTask`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskid,
            date,
            title,
            empName,
            status,
            submissionDate,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
        toast.success(data.message, {
          autoClose: 2000,
        });
        dispatch(fetchUserTasks(empId));
      } else {
        dispatch({ type: UPDATE_TASK_FAILURE, payload: data.message });
        toast.error(data.message);
        toast.success("Task update err");
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      dispatch({ type: UPDATE_TASK_FAILURE, payload: "Something went wrong" });
    }
  };
};

export const deleteTask = (taskId: any) => {
  return async (dispatch: any) => {
    try {
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteTask?taskid=${taskId}`,
        { method: "DELETE" }
      );
      dispatch({ type: "DELETE_TASK_SUCCESS", payload: taskId });
      dispatch(tasksList());
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
};

export const SingleTask = (userId: any) => async (dispatch: any) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/singleTask/?taskid=${userId}`
    );
    dispatch({
      type: FETCH_SINGLE_TASK_SUCCESS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FETCH_SINGLE_TASK_FAILURE,
      payload: err.response.data.message,
    });
  }
};
