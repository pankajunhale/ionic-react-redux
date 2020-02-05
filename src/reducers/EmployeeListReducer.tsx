import { Reducer, Observable, Action, AnyAction } from 'redux'
import { EmployeeSearchState, EmployeeFilter, EmployeePaginationDto, EmployeeSearchTermDTO, EmployeeGenderDTO } from '../state/EmployeeList'
import { EmployeeDto } from '../model/EmployeeDTO'
import { EmployeeInfo } from '../mock-data/EmployeeMockData'
import { getAllDomain, getAllGender } from '../services/employee-search/EmployeeSearchService'
import { EmployeeServiceNew } from '../services/employee-search/EmployeeSearchServiceNew'
import { EmployeeEmailDomainDTO } from '../model/EmployeeEmailDomainDTO'
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { mergeMap, map, take } from 'rxjs/operators';
import { pipe, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { statement } from '@babel/template'

// Type-safe initialState!
export const initialState: EmployeeSearchState = {
  EmployeeList: new Array<EmployeeDto>(),
  EmployeePagination: new EmployeePaginationDto(),
  EmployeeSearchTermFilter: new EmployeeSearchTermDTO(),
  EmployeeDomainFilter: new Array<EmployeeEmailDomainDTO>(),
  GenderFilter: new Array<EmployeeGenderDTO>(),
  Gender:""
}
const _service = new EmployeeServiceNew();
const loadAllEmployeeSuccess = (payload: any) => ({
  type: 'LOAD_ALL_EMPLOYEE_SUCCESS', payload: payload
});
const loadEmployeeDomainFilterSuccess = (payload: any) => ({
  type: 'LOAD_ALL_DOMAIN_FILTER_SUCCESS', payload: payload
});
const filterEmployeeByNameSuccess = (payload: any) => ({
  type: 'FILTER_EMPLOYEE_BY_NAME_SUCCESS', payload: payload
});

const fetchUserEpic = (action$: any) => (
  action$.pipe(ofType('LOAD_ALL_EMPLOYEE'),
    mergeMap((action: any) => {
      return _service.findAllEmployee(action.data).pipe(
        map(response => loadAllEmployeeSuccess(response))
      )
    })
  ));
  const filterEmployeeByDomainEpic = (action$: any) => (
  action$.pipe(ofType('FILTER_EMPLOYEE_BY_DOMAIN'),
    mergeMap((action: any) => {
      return _service.filterEmployeeByDomain(action.data).pipe(
        map(response => loadAllEmployeeSuccess(response))
      )
    })
  ));

const filterEmployeeByGenderEpic = (action$:any) => ( 
  action$.pipe(ofType('FILTER_EMPLOYEE_BY_GENDER'), 
  mergeMap((action:any) =>    
    _service.filterEmployeeByGender(action.data).pipe(
      map(response => filterEmployeeByNameSuccess(response))
    )
)));


const fetchEmployeeDomainFilterEpic = (action$: any) => (
  action$.pipe(ofType('LOAD_ALL_DOMAIN_FILTER'),
    mergeMap(action =>
      _service.domain$.pipe(
        map(response => loadEmployeeDomainFilterSuccess(response))
      )
    )))

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducerFetchAllEmployee: Reducer<EmployeeSearchState> = (state = initialState, action) => {
  console.log('prev state -', state);
  switch (action.type) {
    case 'LOAD_ALL_EMPLOYEE_SUCCESS':
      const newArray: EmployeeDto[] = action.payload.map((a: EmployeeDto) => Object.assign({}, a));
      return {
        ...state,
        EmployeeList: newArray,
      }
    case 'LOAD_ALL_DOMAIN_FILTER_SUCCESS':
      return {
        ...state,
        EmployeeDomainFilter: action.payload
      }
    default:
      return state;

  }
}
// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducerFetchAllEmployee as employeeListReducer }
export { fetchUserEpic as fetchUserEpic }
export { fetchEmployeeDomainFilterEpic as fetchEmployeeDomainFilterEpic }
export { filterEmployeeByDomainEpic as filterEmployeeByDomainEpic }
export { filterEmployeeByGenderEpic as filterEmployeeByGenderEpic }