import React from 'react';

export const MyTextBox = (props:any) => {

  return (
    <div className="form-group">
      <label htmlFor={props.label}>
        {props.label}
      </label>
      <input
        {...props.input}
        placeholder={props.label}
        type="text"
        className="form-control"
      />
      {props.meta && props.meta.error && props.meta.touched && (
        <div className="sans-serif red">
          {props.meta.error}
        </div>
      )}
    </div>
  );
}

export default Text;