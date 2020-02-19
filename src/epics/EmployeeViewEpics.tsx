import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { EmployeeServiceNew } from "../services/employee-search/EmployeeSearchServiceNew";

const _service = new EmployeeServiceNew();

const viewEmployeeDetailSuccess = (payload: any) => ({
    type: 'VIEW_EMPLOYEE_DETAILS_SUCCESS', payload: payload
});

const fetchEmployeeDetailsEpic = (action$: any) => (
    action$.pipe(ofType('VIEW_EMPLOYEE_DETAILS'),
      mergeMap((action: any) => {
        return _service.findEmployeeById(action.data).pipe(
          map((response) =>{
           return viewEmployeeDetailSuccess(response)
          })         
        )
      })
));

export { fetchEmployeeDetailsEpic as fetchEmployeeDetailsEpic }