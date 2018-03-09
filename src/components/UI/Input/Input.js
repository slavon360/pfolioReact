import React from 'react';
//import classes from './Input.css';

const input = (props) => {
    return (
      <input
        {...props.elementConfig}
        className={props.classes}
        value={props.value}
        onChange={props.inputChange} />
    )
}

export default input;
