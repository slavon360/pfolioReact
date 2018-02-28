import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './WorkGrid.css';

const workGrid = (props) => {
      let frontImg, frontImgStyles = {}, preFrontImg, preFrontImgStyles = {}, middleImg, middleImgStyles = {},
      backgroundImg, backgroundImgStyles = {}, workBackgrnds = [];
      if (props.workData.images.background) {
          backgroundImg = require('../../../assets/images/works/'+props.workData.images.background);
          backgroundImgStyles = {backgroundImage:'url(' + backgroundImg + ')'};
          workBackgrnds.push(
            <div
              key={3}
              className={classes.WorkImgBackground}
              style={backgroundImgStyles}>
            </div>
          )
      }
      if (props.workData.images.middle) {
          middleImg = require('../../../assets/images/works/'+props.workData.images.middle);
          middleImgStyles = {backgroundImage:'url(' + middleImg + ')'};
          workBackgrnds.push(
            <div
              key={2}
              className={classes.WorkImgMiddle}
              style={middleImgStyles}>
            </div>
          )
      }
      if (props.workData.images.preFront) {
          preFrontImg = require('../../../assets/images/works/'+props.workData.images.preFront);
          preFrontImgStyles = {backgroundImage:'url(' + preFrontImg + ')'};
          workBackgrnds.push(
            <div
              key={1}
              className={classes.WorkImgPreFront}
              style={preFrontImgStyles}>
            </div>
          )
      }
      if (props.workData.images.front) {
          frontImg = require('../../../assets/images/works/'+props.workData.images.front);
          frontImgStyles = {backgroundImage:'url(' + frontImg + ')'};
          workBackgrnds.push(
            <div
              key={0}
              className={classes.WorkImgFront}
              style={frontImgStyles}>
            </div>
          )
      }
      console.log(props)
      return (
        <div className={classes.WorkGridWrp}>
          <NavLink to={props.location.pathname + '/' + props.workData.title}>
            {workBackgrnds}
            <div className={classes.BriefInfoWrp}>
              <div
                className={classes.Title}>{props.workData.title}</div>
              <div
                className={classes.BriefInfo}
                style={{color: props.workData.briefInfo.color}}>{props.workData.briefInfo.briefInfo}</div>
              <div className={classes.Ball}>
                <div className={classes.Kernel}></div>
              </div>
            </div>
          </NavLink>
        </div>
      )
}

export default workGrid;
