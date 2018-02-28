import React from 'react';
import classes from './MainInfo.css';
import TopInfo from '../TopInfo/TopInfo';
import Paragraphs from '../Paragraphs/Paragraphs';

const mainInfo = (props) => {
      return (
        <div className={classes.MainInfoWrp}>
          <TopInfo currentWork={props.currentWork} />
          <div className={classes.Description}>{props.currentWork.description.translate}</div>
          <Paragraphs currentWork={props.currentWork}/>
        </div>
      )
};

export default mainInfo;
