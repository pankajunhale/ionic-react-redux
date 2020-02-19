import { Reducer } from 'redux';
import { EmployeeLoginDto } from '../model/EmployeeLoginDto';
import { EmployeeLoginState } from '../state/EmployeeLoginState';
import { loginEmployeeEpic } from '../epics/EmployeeLoginEpics';

//define initial state

export const initialEmployeeLoginState: EmployeeLoginState = {
    EmployeeLoginDetails: new EmployeeLoginDto()
}

const loginEmployeeReducer: Reducer<EmployeeLoginState> = (state = initialEmployeeLoginState, action) => {
  switch (action.type) {
      case 'LOGIN_EMPLOYEE_SUCCESS':
        return {
          ...state,
          EmployeeDetails: action.payload
        }    
        default:
            return state;    
    }
}

export {loginEmployeeReducer as loginEmployeeReducer}
export {loginEmployeeEpic as loginEmployeeEpic}
