//https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d
import { Field, reduxForm, InjectedFormProps, Form } from "redux-form"
import { EmployeeLoginDto } from "../model/EmployeeLoginDto"
import React, { Component } from "react"
import { ApplicationState } from "../stores"
import { connect } from "react-redux"
import { MyTextBox } from "./dumb/MyTextBox"
import { EmployeeDto } from "../model/EmployeeDTO"

export interface IEmployeeEditFormProps{
  firstName:string;
  lastName:string
  handleSubmit:any;
  initialValues:any;
}
export interface IDispatchProps {
}

const EmployeeEditComponent =
(props:IDispatchProps & InjectedFormProps<IEmployeeEditFormProps, IDispatchProps>) => (
  

  <form onSubmit={props.handleSubmit}>
     <div>
     <Field
          name="firstName"
          label="First Name"
          component={MyTextBox}          
        />  
      </div>
      <div>
      <Field
          name="lastName"
          label="Last Name"
          component={MyTextBox}          
        />      
      </div>
        <div >
        <button type="submit" disabled={props.pristine || props.submitting} className="btn btn-primary mr-2">Submit</button>
              <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset} className="btn btn-primary">
                Clear Values
              </button>
        </div>
  </form>
);


export const EmployeeEdit = reduxForm<IEmployeeEditFormProps, IDispatchProps>({
  form: 'employee-edit-form',
  enableReinitialize: true
})(EmployeeEditComponent);

export default EmployeeEdit;



