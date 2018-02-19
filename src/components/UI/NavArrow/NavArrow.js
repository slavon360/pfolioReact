import React from 'react';
import classes from './NavArrow.css';

const navArrow = (props) => {
        let attachedClasses = [classes.NavArrow];
        let scrollWork = props.scrollWorkUp || props.scrollWorkDown;
        props.upsideDown && (attachedClasses = [classes.NavArrow, classes.NavArrowUpsideDown]);
        return (
              <div onClick={() => {scrollWork(props.worksNumber)}} className={attachedClasses.join(' ')}></div>
            )
}

export default navArrow;
