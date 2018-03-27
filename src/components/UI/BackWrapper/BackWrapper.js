import React from 'react';
import Swipeable from 'react-swipeable';
import classes from './BackWrapper.css';

const backWrapper = (props) => {
    let attachedClasses = [classes.BackWrapper, classes.BackWrapperInactive];
    if (props.openedMenu){
        attachedClasses = [classes.BackWrapper, classes.BackWrapperActive];
    }
    return (
            <Swipeable onSwipingLeft={props.swipingLeft}>
              <div className={attachedClasses.join(' ')}>{props.children}</div>
            </Swipeable>
          )
}

export default backWrapper;
