import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainInfo from './MainInfo/MainInfo';
import DevicesView from './DevicesView/DevicesView';
import BackButton from '../../Navigation/BackButton/BackButton';
import classes from './WholeWork.css';

class WholeWork extends Component{
      state = {
        windowHeight: 0,
        windowWidth: 0,
        component: null,
        yPosition: null,
        topPosition: 0,
        scrollDownLimit: null
      }
      componentDidMount(){
        this.updateWindowDimensions();
        let component = this.workContainer;
        let yPosition = component.getBoundingClientRect().y;
        this.setState({component: component, yPosition: yPosition});
        window.addEventListener('resize', this.updateWindowDimensions, true);
        window.addEventListener('scroll', this.onScrollWorkWrp, true);
      }
      componentWillUnmount(){
        window.removeEventListener('scroll', this.onScrollWorkWrp, true);
        window.removeEventListener('resize', this.updateWindowDimensions, true);
      }
      updateWindowDimensions = () => {
        console.log('updateWindowDimensions')
        this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        }, () => {
          console.log('onScrollWorkWrp()')
          this.onScrollWorkWrp();
        })
      }
      onScrollWorkWrp = () => {
        let currentYPosition = this.state.component.getBoundingClientRect().y;
        let scrollDownLimit = this.state.topPosition * (-1) > this.state.windowHeight;
        let topPosition = this.state.yPosition - currentYPosition;
        this.setState({
                        topPosition: topPosition > 0 ? -topPosition : topPosition, 
                        scrollDownLimit: scrollDownLimit
                      });
      }
      render (){
        let title = this.props.match.params.title, backgroundImg;
        let currentWork = this.props.works.reduce((result, current) => {
          current.title === title && (result = current);
          return result;
        }, {});
        let opacity = !this.state.scrollDownLimit ? 1 + this.state.topPosition/450 : 0;
        currentWork.images.background && (backgroundImg = require('../../../assets/images/works/'+currentWork.images.background));
        return (
                <div className={classes.WholeWorkWrp}>
                  <BackButton link="/works" />
                  <div
                    className={classes.WholeWorkContainer}
                    style={{backgroundColor:currentWork.backgroundColor}}
                    ref={(node) => {this.workContainer = node}}>
                    <div
                      className={classes.BackgroundHead}
                      style={{
                              top: !this.state.scrollDownLimit ? this.state.topPosition : -this.state.windowHeight,
                              opacity: opacity
                            }}>
                      <img src={backgroundImg} alt={currentWork.title} />
                    </div>
                    <MainInfo currentWork={currentWork} />
                    <DevicesView currentWork={currentWork} />
                  </div>
                </div>
              )
      }
}

const mapStateToProps = (state) => {
    return {
      works: state.dataReducer.works
    }
}

export default connect(mapStateToProps, null)(WholeWork);
