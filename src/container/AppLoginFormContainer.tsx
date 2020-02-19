import React,{Component} from 'react';
import MyTextBox from '../components/dumb/MyTextBox';
import { connect } from 'react-redux';
import { ApplicationState } from '../stores';
import { EmployeeLoginDto } from '../model/EmployeeLoginDto';
import {IDispatchProps,ILoginFormProps,LoginForm} from '../components/LoginForm';

interface IAppLoginFormContainerProps{
    employeeLoginDetails:EmployeeLoginDto;
    validateEmployeeLoginDetails:any;    
}
interface IAppLoginFormContainerState{    
}
type AllProps = IAppLoginFormContainerProps & IAppLoginFormContainerState;

class AppLoginFormContainer extends Component<AllProps>{
    constructor(props:any){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (values:any)=>{
        console.log(values);
        localStorage.setItem('login-info',JSON.stringify(values));
    }

    render(){
        const values ={
            userName:'',
            password:'',
            selectedStorageType:'0',
            storageTypeList:[
                {id:1,name:'Session Storage'},
                {id:2,name:'Local Storage'}
            ]
        }
        return(
            <div>
            <LoginForm
                initialValues={values} 
                onSubmit={this.handleChange}>
            </LoginForm>
            </div>
        )
    }
}


// const mapStateToProps = (state:ApplicationState) => ({
//     employeeLoginDetails: state.employeeLoginState.EmployeeLoginDetails
// });

// const mapDispatchToProps = (dispatch:any) => ({
//     validateEmployeeLoginDetails:(loginInfo:any) => dispatch({type:'LOGIN_EMPLOYEE',data:loginInfo}),
// });

export default connect()(AppLoginFormContainer);

//export default AppLoginFormContainer;