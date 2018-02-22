import React from 'react';
import classes from './Work.css';

const work = (props) => {

    let backgroundImg, backgroundImgStyles = {}, frontImg, frontImgStyles = {}, middleImg, middleImgStyles ={},
    containerInnerStyles = {};
    let WorkWrpClasses = [classes.WorkWrp, classes.WorkWrpNormal];
    !props.workData.zIndex && (WorkWrpClasses = [classes.WorkWrp, classes.WorkWrpSlow]);
    if (props.workData.images.front) {
        frontImg = require('../../assets/images/works/'+props.workData.images.front);
        frontImgStyles = {backgroundImage:'url(' + frontImg + ')'};
        if (props.workData.zIndex) {
          frontImgStyles.transform = 'translate3d(-' + props.xAxis/5.5 + 'px, -' + props.yAxis/25 + 'px, ' + '485px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          frontImgStyles.transform = 'translate3d(-' + props.tempXAxis/5.5 + 'px, -' + props.tempYAxis/25 + 'px, ' + '485px' + ')';
        }
    }
    if (props.workData.images.middle) {
        middleImg = require('../../assets/images/works/'+props.workData.images.middle);
        middleImgStyles = {backgroundImage:'url(' + middleImg + ')'};
        if (props.workData.zIndex) {
          middleImgStyles.transform = 'translate3d(-' + props.xAxis/20 + 'px, -' + props.yAxis/13 + 'px, ' + '245px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          middleImgStyles.transform = 'translate3d(-' + props.tempXAxis/20 + 'px, -' + props.tempYAxis/13 + 'px, ' + '245px' + ')';
        }
    }
    if (props.workData.images.background) {
        backgroundImg = require('../../assets/images/works/'+props.workData.images.background);
        backgroundImgStyles = {backgroundImage:'url(' + backgroundImg + ')'};
        if (props.workData.zIndex) {
          backgroundImgStyles.transform = 'translate3d(-' + props.xAxis/28 + 'px, -' + props.yAxis/32 + 'px, ' + '145px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          backgroundImgStyles.transform = 'translate3d(-' + props.tempXAxis/28 + 'px, -' + props.tempYAxis/32 + 'px, ' + '145px' + ')';
        }
    }
    return (
            <div
              onMouseMove={props.mouseMove}
              className={WorkWrpClasses.join(' ')}
              style={{
                transform: 'translateY('+props.translateYPosition + 'px)',
                zIndex: props.workData.zIndex ? 50 : 1
              }}>
              <div className={classes.ContainerOuter}>
                <div className={classes.Container}>
                  <div
                    className={classes.ContainerInner}
                    style={containerInnerStyles}>
                    <div
                      className={classes.WorkImgBackground}
                      style={backgroundImgStyles}>
                    </div>
                    <div
                      className={classes.WorkImgMiddle}
                      style={middleImgStyles}>
                    </div>
                    <div
                      className={classes.WorkImgFront}
                      style={frontImgStyles}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
}

export default work;
