import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_SINGLE_TASK_REQUEST,
  FETCH_SINGLE_TASK_SUCCESS,
  FETCH_SINGLE_TASK_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from "./action";

interface TaskState {
  tasks: any;
  loading: boolean;
  error: string;
  data: { id: any; }[];
  singleTask: null,
  messageArray: null,
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: "",
  data: [],
  singleTask: null,
  messageArray: null,
};

const taskReducer = (state = initialState, action: any): TaskState => {
  switch (action.type) {
    case FETCH_SINGLE_TASK_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_SINGLE_TASK_SUCCESS:
      return { ...state, loading: false, singleTask: action.payload, error: "" };
    case FETCH_SINGLE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
      return { ...state, loading: true, error: "" };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        messageArray: action.payload.message,
        loading: false,
        error: "",
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        messageArray: action.payload,
        error: "",
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.tasks.filter((task: { id: any; }) => task.id !== action.payload.id),
      };
    case ADD_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, data: action.payload.tasks };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
