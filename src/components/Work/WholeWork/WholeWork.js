import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import MainInfo from './MainInfo/MainInfo';
import DevicesView from './DevicesView/DevicesView';
import classes from './WholeWork.css';

class WholeWork extends Component{
      state = {
        windowHeight: window.innerHeight,
        component: null,
        yPosition: null,
        topPosition: 0,
        scrollDownLimit: null
      }
      componentDidMount(){
        this.props.onSetWorkOpened(true);
        let component = ReactDOM.findDOMNode(this);
        let yPosition = component.getBoundingClientRect().y;
        this.setState({component: component, yPosition: yPosition});
        window.addEventListener('scroll', this.onScrollWorkWrp, true);
      }
      componentWillUnmount(){
        window.removeEventListener('scroll', this.onScrollWorkWrp);
      }
      onScrollWorkWrp = () => {
        let currentYPosition = this.state.component.getBoundingClientRect().y;
        let scrollDownLimit = this.state.topPosition * (-1) > this.state.windowHeight;
        let topPosition = this.state.yPosition - currentYPosition;
        this.setState({topPosition: -topPosition, scrollDownLimit: scrollDownLimit});
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
                <div
                  className={classes.WholeWorkWrp}
                  style={{backgroundColor:currentWork.backgroundColor}}>
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
              )
      }
}

const mapStateToProps = (state) => {
    return {
      works: state.dataReducer.works
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onSetWorkOpened: (value) => dispatch(actions.setWorkOpened(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WholeWork);
