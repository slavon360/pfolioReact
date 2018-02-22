import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Work from '../../components/Work/Work';
import ProjectData from '../../components/Work/ProjectData/ProjectData';
import ScrollNav from '../../components/Navigation/ScrollNav/ScrollNav';
import classes from './Works.css';

class Works extends Component{
    state = {
      windowWidth: 0,
      windowHeight: 0,
      xAxis: 0,
      yAxis: 0,
      tempXAxis: null,
      tempYAxis: null
    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount(){
      console.log('WORKS [componentWillUnmount]')
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }, () => {
        //callback
      })
    }
    mouseMoveHandler = (event) => {
      (this.state.tempYAxis || this.state.tempXAxis) && this.setState({tempXAxis: null, tempYAxis: null});
      this.setState({xAxis: event.screenX, yAxis: event.screenY});
    }
    scrollWorkUp = (worksNumber, event) => {
      //this.mouseMoveHandler(event);
      this.setState({tempXAxis: event.screenX, tempYAxis: event.screenY});
      this.props.onScrollWorkUp(worksNumber);
    }
    scrollWorkDown = (worksNumber, event) => {
      //this.mouseMoveHandler(event);
      this.setState({tempXAxis: event.screenX, tempYAxis: event.screenY});
      this.props.onScrollWorkDown(worksNumber);
    }
    render(){
      let currentWorkIndex = this.props.currentWorkIndex;
      let works = this.props.works.map((work, index, worksArr) => {
          let translateYPosition = this.state.windowHeight * (index - this.props.currentWorkIndex);
          work.zIndex = false;
          currentWorkIndex === index && (work.zIndex = true) && (translateYPosition = 0);
          work.translateYPosition = translateYPosition;
          if (currentWorkIndex-1 < 0) {
            worksArr[worksArr.length-1].translateYPosition = - this.state.windowHeight;
          };
          if (currentWorkIndex+1 > worksArr.length-1) {
            worksArr[0].translateYPosition = this.state.windowHeight;
          }
          return <Work
                  tempXAxis={this.state.tempXAxis}
                  tempYAxis={this.state.tempYAxis}
                  xAxis={this.state.xAxis}
                  yAxis={this.state.yAxis}
                  mouseMove={this.mouseMoveHandler}
                  translateYPosition={work.translateYPosition}
                  key={work.title}
                  workData={work}
                  scrollDown={this.props.scrollDown}
                  scrollUp={this.props.scrollUp} />
      })
      return (
              <div className={classes.WorksWrp}>
                {works}
                <ProjectData
                  mouseMove={this.mouseMoveHandler}
                  projectInfo={this.props.works[currentWorkIndex]}
                  scrollDown={this.props.scrollDown}
                  scrollUp={this.props.scrollUp} />
                <ScrollNav
                  worksNumber={this.props.works.length-1}
                  scrollWorkDown={this.scrollWorkDown}
                  scrollWorkUp={this.scrollWorkUp} />
              </div>
            );
    }
}
const mapStateToProps = (state) => {
    return {
      works: state.dataReducer.works,
      currentWorkIndex: state.uireducer.currentWorkIndex,
      scrollDown: state.uireducer.scrollDown,
      scrollUp: state.uireducer.scrollUp
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onScrollWorkUp: (worksNumber) => dispatch(actions.scrollWorkUp(worksNumber)),
      onScrollWorkDown: (worksNumber) => dispatch(actions.scrollWorkDown(worksNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);
