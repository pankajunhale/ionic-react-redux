import {Component} from 'react';
import {connect} from 'react-redux';
import { EmployeeDto } from '../model/EmployeeDTO';
import { ApplicationState } from '../stores';

interface IEmployeeSearchContainerProps{
    employeeList:EmployeeDto[];
}

interface IEmployeeSearchContainerState{
}
    

class EmployeeSearchContainer extends Component<IEmployeeSearchContainerProps,IEmployeeSearchContainerState> {
    constructor(props:any){
        super(props);
    }
}

// const mapStateToProps = (state:ApplicationState) =>{
//     return {
//         employeeList:state.employeeListState.EmployeeList
//     }
// }

const mapDispatchActionsToProps ={

}

export default EmployeeSearchContainer;

