import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { EmployeeServiceNew } from "../services/employee-search/EmployeeSearchServiceNew";

const _service = new EmployeeServiceNew();

const viewEmployeeDetailSuccess = (payload: any) => ({
    type: 'LOGIN_EMPLOYEE_SUCCESS', payload: payload
});

const loginEmployeeEpic = (action$: any) => (
    action$.pipe(ofType('LOGIN_EMPLOYEE'),
      mergeMap((action: any) => {
        return _service.findEmployeeById(action.data).pipe(
          map((response) =>{
           return viewEmployeeDetailSuccess(response)
          })         
        )
      })
));

export { loginEmployeeEpic as loginEmployeeEpic }