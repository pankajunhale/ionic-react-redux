//https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d
import { Field, reduxForm, InjectedFormProps, Form } from "redux-form"
import { EmployeeLoginDto } from "../model/EmployeeLoginDto"
import React, { Component } from "react"
import { ApplicationState } from "../stores"
import { connect } from "react-redux"
import { MyTextBox } from "./dumb/MyTextBox"
import MyDropDown from "./dumb/MyDropDown"

export interface ILoginFormProps{
   username:string;
   password:string;
   selectedStorageType:string;
   storageTypeList:any
  handleSubmit:any;
  initialValues:any;
}
export interface IDispatchProps {
}
const LoginComponent =
(props:IDispatchProps & InjectedFormProps<ILoginFormProps, IDispatchProps>) => (
  <div  className="container">
  <form onSubmit={props.handleSubmit}>
  <div>
  <h2>Enter Login Details</h2>
  <Field
          name="userName"
          label="User Name"
          component={MyTextBox}          
        />
      <Field
          name="password"
          label="Password"
          component={MyTextBox}          
        />  
      <div className="form-group">
      <Field 
          label="Storage Type"
          name="selectedStorageType"
          options={props.initialValues.storageTypeList}
          component={MyDropDown}>
          </Field>
      </div>
          
        <div>
        <button type="submit" disabled={props.pristine || props.submitting} className="btn btn-primary mr-2">Submit</button>
              <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset} className="btn btn-primary">
                Clear Values
              </button>
        </div>
    </div>
  </form>
   </div>
);


export const LoginForm = reduxForm<ILoginFormProps, IDispatchProps>({
  form: 'loginForm',
})(LoginComponent);

export default LoginForm;



