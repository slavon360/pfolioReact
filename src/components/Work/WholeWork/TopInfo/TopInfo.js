import React from 'react';
import classes from './TopInfo.css';

const topInfo = (props) => {
    return (
      <div className={classes.Top}>
        <div
          className={classes.Client}>
          <div className={classes.ClientKey}>Client</div>
          <div className={classes.ClientValue}>{props.currentWork.title}</div>
        </div>
        <div
          className={classes.Case}>
          <div
            className={classes.CaseWord}>Case</div>
          <div
            className={classes.Title}>{props.currentWork.title}</div>
          <div className={classes.BriefInfo}>{props.currentWork.briefInfo.briefInfo}</div>
        </div>
      </div>
    );
}

export default topInfo;
