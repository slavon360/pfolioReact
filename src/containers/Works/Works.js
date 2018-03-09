import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Throttle } from 'react-throttle';
import * as actions from '../../store/actions/index';
import Work from '../../components/Work/Work';
import WorkGrid from '../../components/Work/WorkGrid/WorkGrid';
import ProjectData from '../../components/Work/ProjectData/ProjectData';
import ScrollNav from '../../components/Navigation/ScrollNav/ScrollNav';
import ViewsDpDwn from '../../components/ViewsDpDwn/ViewsDpDwn';
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
      window.addEventListener('resize', this.updateWindowDimensions, true);
    }
    componentWillUnmount(){
      console.log('WORKS [componentWillUnmount]')
      window.removeEventListener('resize', this.updateWindowDimensions, true);
    }
    updateWindowDimensions = () => {
      console.log('updateWindowDimensions')
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
          let currentWork;
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
          if (this.props.worksSection.listView){
            currentWork = <Work
                            tempXAxis={this.state.tempXAxis}
                            tempYAxis={this.state.tempYAxis}
                            xAxis={this.state.xAxis}
                            yAxis={this.state.yAxis}
                            mouseMove={this.mouseMoveHandler}
                            translateYPosition={work.translateYPosition}
                            key={work.title}
                            workData={work} />
          }
          if (this.props.worksSection.gridView){
            currentWork = <WorkGrid
                            location={this.props.location}
                            key={work.title}
                            workData={work}/>
          }
          return currentWork;
      })
      let worksWrpClasses = [classes.WorksWrp];
      this.props.worksSection.gridView && (worksWrpClasses = [classes.WorksWrpScroll]);
      return (
              <div className={worksWrpClasses.join(' ')}>
                {works}
                <ViewsDpDwn
                  selectedProp="showDpDwnView"
                  gridView={this.props.worksSection.gridView}
                  listView={this.props.worksSection.listView}
                  showDpDwnView={this.props.showDpDwnView}
                  showHideViewDpDwn={this.props.onShowHideViewDpDwn}
                  hideViewDpDwn={this.props.onHideViewDpDwn}
                  switchToListView={this.props.onSwitchToListView}
                  switchToGridView={this.props.onSwitchToGridView} />
                <ProjectData
                  location={this.props.location}
                  worksSection={this.props.worksSection}
                  mouseMove={this.mouseMoveHandler}
                  projectInfo={this.props.works[currentWorkIndex]}
                  scrollDown={this.props.scrollDown}
                  scrollUp={this.props.scrollUp} />
                <ScrollNav
                  worksSection={this.props.worksSection}
                  worksNumber={this.props.works.length-1}
                  scrollWorkDown={this.scrollWorkDown}
                  scrollWorkUp={this.scrollWorkUp} />
              </div>
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      works: state.dataReducer.works,
      showDpDwnView: state.uireducer.showDpDwnView,
      currentWorkIndex: state.uireducer.currentWorkIndex,
      scrollDown: state.uireducer.scrollDown,
      scrollUp: state.uireducer.scrollUp,
      worksSection: state.uireducer.worksSection
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onSwitchToGridView: () => dispatch(actions.switchToGridView()),
      onSwitchToListView: () => dispatch(actions.switchToListView()),
      onScrollWorkUp: (worksNumber) => dispatch(actions.scrollWorkUp(worksNumber)),
      onScrollWorkDown: (worksNumber) => dispatch(actions.scrollWorkDown(worksNumber)),
      onShowHideViewDpDwn: (propName) => dispatch(actions.showHideViewDpDwn(propName)),
      onHideViewDpDwn: (propName) => dispatch(actions.hideViewDpDwn(propName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);
