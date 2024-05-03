// In store/index.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../user/login/reducer';
import { signupReducer } from '../signup/reducer';
import { ThunkDispatch, thunk ,ThunkAction} from 'redux-thunk';
import userTasksReducer from '../user/userTask/reducer';
import taskReducer from '../admin/task/reducer';
// Combine reducers
const rootReducer = combineReducers({
 login: loginReducer,
 signup: signupReducer,
 userTasks:userTasksReducer,
 task:taskReducer,

});

// Configure store with thunk middleware
const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware:any) => getDefaultMiddleware().concat(thunk), // Updated middleware configuration
});

export default store;

// Exporting RootState type
export type RootState = ReturnType<typeof store.getState>;

// exporting Dispatch return
export type AppDispatch = typeof store.dispatch;

