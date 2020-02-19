import { combineReducers, Action } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { EmployeeSearchState } from '../state/EmployeeList'
import { 
  employeeListReducer, 
  fetchUserEpic,
  fetchEmployeeDomainFilterEpic,
  filterEmployeeByDomainEpic,
  filterEmployeeByGenderEpic
   } from '../reducers/EmployeeListReducer';
import { combineEpics } from 'redux-observable';
import { 
  viewEmployeeReducer, 
  fetchEmployeeDetailsEpic  
 } from '../reducers/EmployeeViewReducer'

import { EmployeeViewState } from '../state/EmployeeViewState'
import { EmployeeLoginState } from '../state/EmployeeLoginState';
import { loginEmployeeReducer, loginEmployeeEpic } from '../reducers';

// The top-level state object
export interface ApplicationState {
    employeeListState: EmployeeSearchState;
    viewEmployeeState: EmployeeViewState;
    employeeLoginState: EmployeeLoginState;
}
export const rootEpic = combineEpics(
  fetchUserEpic,
  fetchEmployeeDomainFilterEpic,
  filterEmployeeByDomainEpic,
  filterEmployeeByGenderEpic,
  fetchEmployeeDetailsEpic,
  loginEmployeeEpic
  );
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
// export const createRootReducer = () =>
//   combineReducers({
//     employeeListState: employeeListReducer,
//     viewEmployeeDetailsState:viewEmployeeReducer
//   });

  export const rootReducer = combineReducers({
    employeeListState: employeeListReducer,
    viewEmployeeState:viewEmployeeReducer,
    employeeLoginState:loginEmployeeReducer,
    form:formReducer
  });