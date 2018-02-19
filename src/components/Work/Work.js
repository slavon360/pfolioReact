import React from 'react';
import classes from './Work.css';

const work = (props) => {
    let backgroundImg = require('../../assets/images/works/'+props.workData.images.background);
    return (
            <div
              className={classes.WorkWrp}
              style={{transform:'translateY('+props.translateYPosition + 'px)'}}>
              <div
                className={classes.WorkBackground}
                style={{backgroundImage:'url(' + backgroundImg + ')'}}></div>
            </div>
          );
}

export default work;
