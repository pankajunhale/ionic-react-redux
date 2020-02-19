import React from 'react';

export const MyDropDown = (props:any) => {
  const renderSelectOptions = (item:any, index:number) => {
    
    return (
      <option
        key={`${index}`}
        value={item['id']}
      >
        {item['name']}
      </option>
    );
  }

  if (props && props.options) {
    return (
      <div className="form-group">
        <label htmlFor={props.label}>{props.label}</label>
        <select {...props.input} className="form-control">
          <option value="">Select</option>
          {props.options.map(renderSelectOptions)}
        </select>
      </div>
    )
  }
  return <div></div>
}

export default MyDropDown;