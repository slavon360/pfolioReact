import React from 'react';
import NavArrow from '../../UI/NavArrow/NavArrow';
import classes from './ScrollNav.css';

const scrollNav = (props) => {
      return (
        <div className={classes.ScrollNavWrp}>
          <NavArrow
            scrollWorkUp={props.scrollWorkUp}
            worksNumber={props.worksNumber} />
          <NavArrow
            scrollWorkDown={props.scrollWorkDown}
            upsideDown={true}
            worksNumber={props.worksNumber} />
        </div>
      )
}

export default scrollNav;
