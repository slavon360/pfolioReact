import React from 'react';
import classes from './Preloader.css';

const preloader = (props) => (
    <div className={classes.OverlayLoader}>
      <div className={classes.Loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
);

export default preloader;
