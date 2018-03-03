import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './BackButton.css';

const backButton = (props) => {
    return (
      <NavLink to={props.link}>
        <div className={classes.BackButtonWrp}>
        </div>
      </NavLink>
    );
}

export default backButton;
