import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import * as actions from '../../store/actions/index';
import Work from '../../components/Work/Work';
import WorkGrid from '../../components/Work/WorkGrid/WorkGrid';
import ProjectData from '../../components/Work/ProjectData/ProjectData';
import ScrollNav from '../../components/Navigation/ScrollNav/ScrollNav';
import ViewsDpDwn from '../../components/ViewsDpDwn/ViewsDpDwn';
import ContactMe from '../../components/ContactMe/ContactMe';
import classes from './Works.css';

class Works extends Component{
    state = {
      windowWidth: 0,
      windowHeight: 0,
      xAxis: 0,
      yAxis: 0,
      tempXAxis: null,
      tempYAxis: null,
      currentDate: Date.now()
    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('wheel', this.onScrollHandler);
      window.addEventListener('resize', this.updateWindowDimensions, true);
    }
    componentWillUnmount(){
      window.removeEventListener('wheel', this.onScrollHandler);
      window.removeEventListener('resize', this.updateWindowDimensions, true);
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
      if (this.props.worksSection.listView && (Date.now() - this.state.currentDate > 1500)){
        (this.state.tempYAxis || this.state.tempXAxis) && this.setState({tempXAxis: null, tempYAxis: null});
        this.setState({xAxis: event.screenX, yAxis: event.screenY});
      }
    }
    scrollWorkUp = (worksNumber, event, swipeDump) => {
      if (Date.now() - this.state.currentDate > 1000){
        this.setState({
                        tempXAxis: event.screenX || swipeDump,
                        tempYAxis: event.screenY || swipeDump,
                        currentDate: Date.now()
                      }, () => {
          this.props.onScrollWorkUp(worksNumber);
        });
      }
    }
    scrollWorkDown = (worksNumber, event, swipeDump) => {
      if (Date.now() - this.state.currentDate > 1000){
        this.setState({
                        tempXAxis: event.screenX || swipeDump,
                        tempYAxis: event.screenY || swipeDump,
                        currentDate: Date.now()
                      }, () => {
          this.props.onScrollWorkDown(worksNumber);
        });
      }
    }
    onScrollHandler = (e) => {
      if (this.props.worksSection.listView && e.deltaY > 0) {
          this.scrollWorkDown(this.props.works.length-1, e);
      }
      if (this.props.worksSection.listView && e.deltaY < 0) {
          this.scrollWorkUp(this.props.works.length-1, e);
      }
    }
    render(){
      let currentWorkIndex = this.props.currentWorkIndex;
      let selectedLanguage = this.props.selectedLanguage;
      let contactMe = this.props.pfolioData[selectedLanguage].menu.Contact.contactMe;
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
            currentWork = <Swipeable
                            key={work.title}
                            onSwipedUp={(e) => {this.scrollWorkDown(this.props.works.length-1, e, 50)}}
                            onSwipedDown={(e) => {this.scrollWorkUp(this.props.works.length-1, e, 50)}}>
                            <Work
                              tempXAxis={this.state.tempXAxis}
                              tempYAxis={this.state.tempYAxis}
                              xAxis={this.state.xAxis}
                              yAxis={this.state.yAxis}
                              mouseMove={this.mouseMoveHandler}
                              translateYPosition={work.translateYPosition}
                              workData={work} />
                          </Swipeable>
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
      this.props.worksSection.gridView && (worksWrpClasses = [classes.WorksWrpScroll]) &&
      works.push(<ContactMe key={contactMe.contact} contactMe={contactMe}/>);
      return (
                <div
                  className={worksWrpClasses.join(' ')}>
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
                    scrollUp={this.props.scrollUp}
                    tempYAxis={this.state.tempYAxis}
                    selectedLanguage={this.props.selectedLanguage}/>
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
      worksSection: state.uireducer.worksSection,
      pfolioData: state.dataReducer.pfolioData,
      selectedLanguage: state.dataReducer.selectedLanguage
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
