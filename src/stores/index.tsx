import { combineReducers, Action } from 'redux'
import { History } from 'history'
import { EmployeeSearchState } from '../state/EmployeeList'
import { 
  employeeListReducer, 
  fetchUserEpic,
  fetchEmployeeDomainFilterEpic,
  filterEmployeeByDomainEpic,
  filterEmployeeByGenderEpic
   } from '../reducers/EmployeeListReducer'
import { combineEpics } from 'redux-observable'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

// The top-level state object
export interface ApplicationState {
    employeeListState: EmployeeSearchState;
}
export const rootEpic = combineEpics(fetchUserEpic,fetchEmployeeDomainFilterEpic,filterEmployeeByDomainEpic,filterEmployeeByGenderEpic);
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () =>
  combineReducers({
    employeeListState: employeeListReducer
  });

  export const rootReducer = combineReducers({
    employeeListState: employeeListReducer
  });
// const epic$ = new BehaviorSubject(combineEpics(fetchUserEpic));
// export const rootEpic = (action$: any, ...rest: any[]) =>
//   epic$.pipe(
//     switchMap(epic => epic(...rest))
//   );

  