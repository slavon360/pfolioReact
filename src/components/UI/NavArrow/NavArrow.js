import React from 'react';
import classes from './NavArrow.css';

const navArrow = (props) => {
          let attachedClasses = [classes.NavArrow];
          let scrollWork = props.scrollWorkUp || props.scrollWorkDown;
          props.upsideDown && (attachedClasses = [classes.NavArrow, classes.NavArrowUpsideDown]);
          let clickHandler = (worksNumber, e) => {
                let event = {screenX: e.screenX, screenY: e.screenY};
                scrollWork(worksNumber, event);
          }
          return (
                <div onClick={(e) => { clickHandler(props.worksNumber, e) }} className={attachedClasses.join(' ')}></div>
              )
}

export default navArrow;
