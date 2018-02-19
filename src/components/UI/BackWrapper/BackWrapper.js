import React from 'react';
import classes from './BackWrapper.css';

const backWrapper = (props) => {
    let attachedClasses = [classes.BackWrapper, classes.BackWrapperInactive];
    if (props.openedMenu){
        attachedClasses = [classes.BackWrapper, classes.BackWrapperActive];
    }
    return (
            <div className={attachedClasses.join(' ')}>{props.children}</div>
          )
}

export default backWrapper;
