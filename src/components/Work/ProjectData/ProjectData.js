import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ProjectData.css';

class ProjectData extends Component {
    state = {
      currentProjectInfo: {}
    }
    shouldComponentUpdate(nextProps, nextState){
      return this.props.tempYAxis > 0 || this.props.worksSection.gridView;
    }
    componentWillReceiveProps(nextProps){
      if (this.props.projectInfo.title !== nextProps.projectInfo.title){
        window.setTimeout(() => {this.setState({currentProjectInfo: nextProps.projectInfo})}, 500);
      }
    }
    componentWillMount(){
      this.setState({currentProjectInfo: this.props.projectInfo});
    }
    componentDidUpdate(){
      console.log('ProjectData updated', this.props.tempYAxis)
    }
    render(){
      let scrollUp = this.props.scrollUp, scrollDown = this.props.scrollDown;
      let header = this.state.currentProjectInfo.header;
      let briefInfo = this.state.currentProjectInfo.briefInfo;
      let description = this.state.currentProjectInfo.description;
      let caseAttachedClasses = [classes.Case], briefInfoAttachedClasses = [classes.BriefInfo];
      let titleAttachedClasses = [classes.Title], descriptionAttachedClasses = [classes.Description];
      let defineScrollUps = (scrollUp) => {
          if (!scrollUp.toggle) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Up];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Up];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Up];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Up];
          }
          else if (scrollUp.toggle === 1) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Up_One];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Up_One];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Up_One];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Up_One];
          }
          else if (scrollUp.toggle === 2) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Up_Two];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Up_Two];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Up_Two];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Up_Two];
          }
      }
      let defineScrollDowns = (scrollDown) => {
          if (!scrollDown.toggle) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Down];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Down];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Down];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Down];
          }
          else if (scrollDown.toggle === 1) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Down_One];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Down_One];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Down_One];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Down_One];
          }
          else if (scrollDown.toggle === 2) {
            caseAttachedClasses = [classes.Case, classes.Case_Scroll_Down_Two];
            titleAttachedClasses = [classes.Title, classes.Title_Scroll_Down_Two];
            briefInfoAttachedClasses = [classes.BriefInfo, classes.BriefInfo_Scroll_Down_Two];
            descriptionAttachedClasses = [classes.Description, classes.Description_Scroll_Down_Two];
          }
      }
      if (scrollUp.value) {
        defineScrollUps(scrollUp);
      }
      if (scrollDown.value) {
        defineScrollDowns(scrollDown);
      }
      let projectDataWrpClasses = [classes.ProjectDataWrp];
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
                <div className={caseAttachedClasses.join(' ')}>{briefInfo.translate}</div>
                <div className={titleAttachedClasses.join(' ')}>{this.state.currentProjectInfo.title}</div>
                <div
                  className={briefInfoAttachedClasses.join(' ')}
                  style={{color: briefInfo.color}}>
                  {briefInfo.briefInfo}
                </div>
                <div className={descriptionAttachedClasses.join(' ')}>
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
