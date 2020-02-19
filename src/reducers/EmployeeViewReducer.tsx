import { Reducer } from 'redux';
import { EmployeeViewState } from '../state/EmployeeViewState';
import { EmployeeDto } from '../model/EmployeeDTO';
import { fetchEmployeeDetailsEpic } from '../epics/EmployeeViewEpics';

//define initial state

export const initialEmployeeViewState: EmployeeViewState = {
    EmployeeDetails: new EmployeeDto(null)
}

const viewEmployeeReducer: Reducer<EmployeeViewState> = (state = initialEmployeeViewState, action) => {
  switch (action.type) {
      case 'VIEW_EMPLOYEE_DETAILS_SUCCESS':
        return {
          ...state,
          EmployeeDetails: action.payload
        }    
        default:
            return state;    
    }
}

export {viewEmployeeReducer as viewEmployeeReducer}
export {fetchEmployeeDetailsEpic as fetchEmployeeDetailsEpic}
