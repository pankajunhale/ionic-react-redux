import React,{Component} from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../stores';
import EmployeeEdit from '../components/EmployeeEditForm';
import { EmployeeDto } from '../model/EmployeeDTO';

interface IEditEmployeeContainerProps{
    employeeInfo:EmployeeDto;
    loadEmployeeDetails:any;
    match:any;    
}
interface IEditEmployeeContainerState{    
}
type AllProps = IEditEmployeeContainerProps & IEditEmployeeContainerState;

class EditEmployeeContainer extends Component<AllProps>{
    constructor(props:any){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.init();
    }
    handleChange = (values:any)=>{
        console.log(values);
        //localStorage.setItem('login-info',JSON.stringify(values));
    }

    private init(){
        this.bindEmployee();
    }

    private bindEmployee(){
        const queryParams = this.props.match.params
        this.props.loadEmployeeDetails(parseInt(queryParams['id']));
    }

    render(){
        const values ={
            firstName:this.props.employeeInfo.FirstName,
            lastName:this.props.employeeInfo.LastName
        }
        if (this.props.employeeInfo.Id > 0) {
            return (
                <div>

                    <div className="container">
                        <h2>Edit Employee</h2>
                        <EmployeeEdit
                            initialValues={values}
                            onSubmit={this.handleChange}>
                        </EmployeeEdit>
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                </tr>
                                <tr>
                                    <td>Mary</td>
                                    <td>Moe</td>
                                    <td>mary@example.com</td>
                                </tr>
                                <tr>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>july@example.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            )
        }else{
            return null;
        }
    }
}


const mapStateToProps = (state:ApplicationState) => ({
    employeeInfo: state.viewEmployeeState.EmployeeDetails
});

const mapDispatchToProps = (dispatch:any) => ({
    loadEmployeeDetails:(id:number) => dispatch({type:'VIEW_EMPLOYEE_DETAILS',data:id}),
});

export default connect(mapStateToProps,mapDispatchToProps)(EditEmployeeContainer);
