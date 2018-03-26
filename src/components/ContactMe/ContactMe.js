import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ContactMe.css';

const contactMe = props => (
    <div className={classes.ContactMeWrp}>
      <div className={classes.Head}>{props.contactMe.head}</div>
      <div className={classes.Bottom}>
        <div className={classes.Question}>{props.contactMe.question}</div>
        <div className={classes.Contact}>
          <NavLink to={props.contactMe.contactLink}>{props.contactMe.contact}</NavLink>
        </div>
      </div>
    </div>
);

export default contactMe;
