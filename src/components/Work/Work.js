import React from 'react';
import throttle from 'react-throttle-render'
import classes from './Work.css';
const work = (props) => {
    let backgroundImg, backgroundImgStyles = {}, frontImg, frontImgStyles = {}, middleImg, middleImgStyles = {},
    preFrontImg, preFrontImgStyles = {}, containerInnerStyles = {};
    let WorkWrpClasses = [classes.WorkWrp, classes.WorkWrpNormal];
    !props.workData.zIndex && (WorkWrpClasses = [classes.WorkWrp, classes.WorkWrpSlow]);
    if (props.workData.images.front) {
        frontImg = require('../../assets/images/works/'+props.workData.images.front);
        if (props.workData.zIndex) {
          frontImgStyles.transform = 'translate3d(-' + props.xAxis/5.5 + 'px, -' + props.yAxis/25 + 'px, ' + '485px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          frontImgStyles.transform = 'translate3d(-' + props.tempXAxis/5.5 + 'px, -' + props.tempYAxis/25 + 'px, ' + '485px' + ')';
        }
    }
    if (props.workData.images.preFront) {
        preFrontImg = require('../../assets/images/works/'+props.workData.images.preFront);
        if (props.workData.zIndex) {
          preFrontImgStyles.transform = 'translate3d(-' + props.xAxis/12.5 + 'px, -' + props.yAxis/23 + 'px, ' + '345px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          preFrontImgStyles.transform = 'translate3d(-' + props.tempXAxis/12.5 + 'px, -' + props.tempYAxis/23 + 'px, ' + '345px' + ')';
        }
    }
    if (props.workData.images.middle) {
        middleImg = require('../../assets/images/works/'+props.workData.images.middle);
        if (props.workData.zIndex) {
          middleImgStyles.transform = 'translate3d(-' + props.xAxis/20 + 'px, -' + props.yAxis/13 + 'px, ' + '245px' + ')';
        };
        if (props.tempXAxis || props.tempYAxis) {
          middleImgStyles.transform = 'translate3d(-' + props.tempXAxis/20 + 'px, -' + props.tempYAxis/13 + 'px, ' + '245px' + ')';
        }
    }
    if (props.workData.images.background) {
        backgroundImg = require('../../assets/images/works/'+props.workData.images.background);
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
                      <img
                        className={classes.WorkImgBackground}
                        src={backgroundImg}
                        alt={props.workData.title}
                        style={{
                            transform: backgroundImgStyles.transform
                          }} />
                      <img
                        className={classes.WorkImgMiddle}
                        src={middleImg}
                        alt={props.workData.title}
                        style={{
                            transform: middleImgStyles.transform
                        }} />
                      <img
                        className={classes.WorkImgPreFront}
                        src={preFrontImg}
                        alt={props.workData.title}
                        style={{
                            transform: preFrontImgStyles.transform
                        }} />
                      <img
                        className={classes.WorkImgFront}
                        src={frontImg}
                        alt={props.workData.title}
                        style={{
                            transform: frontImgStyles.transform
                        }} />
                    </div>
                  </div>
                </div>
              </div>
          );
}

export default throttle(150)(work);
