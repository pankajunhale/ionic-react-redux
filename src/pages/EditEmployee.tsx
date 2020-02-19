import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import Text from '../components/dumb/MyTextBox';
import { ApplicationState } from '../stores';

export const EditEmployeeFormContainer = (props:any) => {
  
    const submitForm = (formValues:any) => {
    console.log('submitting Form: ', formValues);
  }

  return (
   <div></div>
  );
}

const mapStateToProps = (state:ApplicationState) => ({
  formValues: getFormValues('my-very-own-form')(state),
});
const formConfiguration = {
  form: 'my-very-own-form',
}

export default connect(mapStateToProps)(
  reduxForm(formConfiguration)(EditEmployeeFormContainer)
);

//EditEmployeeFormContainer;