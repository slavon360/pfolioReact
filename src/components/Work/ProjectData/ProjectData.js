import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ProjectData.css';

class ProjectData extends Component {
    state = {
      currentProjectInfo: {}
    }
    componentWillMount(){
      this.setState({currentProjectInfo: this.props.projectInfo});
    }
    componentWillReceiveProps(nextProps){
      this.props.selectedLanguage !== nextProps.selectedLanguage && this.setState({currentProjectInfo: nextProps.projectInfo});
      if (this.props.projectInfo && nextProps.projectInfo && this.props.projectInfo.title !== nextProps.projectInfo.title){
        window.setTimeout(() => {this.setState({currentProjectInfo: nextProps.projectInfo})}, 700);
      }
    }
    shouldComponentUpdate(nextProps, nextState){
      let languageUpdated = this.props.selectedLanguage !== nextProps.selectedLanguage;
      return this.props.tempYAxis > 0 || this.props.worksSection.gridView || languageUpdated;
    }
    render(){
      let scrollUp = this.props.scrollUp, scrollDown = this.props.scrollDown;
      let header = this.state.currentProjectInfo.header;
      let briefInfo = this.state.currentProjectInfo.briefInfo;
      let description = this.state.currentProjectInfo.description;
      let projectDataWrpClasses = [classes.ProjectDataWrp];
      let defineScrollUps = (scrollUp) => {
          if (!scrollUp.toggle) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Up];
          }
          else if (scrollUp.toggle === 1) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Up_One];
          }
          else if (scrollUp.toggle === 2) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Up_Two];
          }
      }
      let defineScrollDowns = (scrollDown) => {
          if (!scrollDown.toggle) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Down];
          }
          else if (scrollDown.toggle === 1) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Down_One];
          }
          else if (scrollDown.toggle === 2) {
            projectDataWrpClasses = [classes.ProjectDataWrp, classes.ProjectDataWrp_Scroll_Down_Two];
          }
      }
      if (scrollUp.value) {
        defineScrollUps(scrollUp);
      }
      if (scrollDown.value) {
        defineScrollDowns(scrollDown);
      }

      this.props.worksSection.gridView && (projectDataWrpClasses = [classes.ProjectDataWrpHidden])
      return (
        <div
          onMouseMove={this.props.mouseMove}
          className={projectDataWrpClasses.join(' ')}>
          <div className={classes.LeftSide}>Slavon360</div>
          <div className={classes.RightSide}>
            <NavLink
              to={this.props.location.pathname + '/' + this.props.projectInfo.title}
              style={{color: '#fff', textDecoration: 'none'}}>
              <div className={classes.Header}>{header.translate}</div>
              <div className={classes.Content}>
                <div className={classes.Case}>{briefInfo.translate}</div>
                <div className={classes.Title}>{this.state.currentProjectInfo.title}</div>
                <div
                  className={classes.BriefInfo}
                  style={{color: briefInfo.color}}>
                  {briefInfo.briefInfo}
                </div>
                <div className={classes.Description}>
                  <div
                    className={classes.Ball}>
                    <div className={classes.Kernel}></div>
                  </div>
                  <span className={classes.SeeMore}>{this.state.currentProjectInfo.more.translate}</span>
                  <div className={classes.DescriptionText}>
                    {description.translate}
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      )
    }
}

export default ProjectData;
