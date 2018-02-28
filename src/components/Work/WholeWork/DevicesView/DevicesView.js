import React from 'react';
import classes from './DevicesView.css';

const devicesView = (props) => {
      let title = props.currentWork.title.replace(' ', '_');
      let deviceImg = require('../../../../assets/images/works/devices' + title + '.jpg');
      return (
        <div
          className={classes.DevicesViewWrp}>
          <img src={deviceImg} alt={props.currentWork.title} />
        </div>
      );
};

export default devicesView;
