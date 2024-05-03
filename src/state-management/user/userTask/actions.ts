import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE
  } from './actionsTypes';
  
  export const fetchUserTasks = (empId:any) => {
    return async (dispatch:any) => {
      dispatch(fetchTasksRequest());
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/userTaskList?empid=${empId}`);
        const data = await response.json();
        if (response.ok) {
          dispatch(fetchTasksSuccess(data.tasks));
        } else {
          throw new Error(data.message);
        }
      } catch (error:any) {
        dispatch(fetchTasksFailure(error.message));
      }
    };
  };
  
  const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST
  });
  
  const fetchTasksSuccess = (tasks:any) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks
  });
  
  const fetchTasksFailure = (error:any) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error
  });
  