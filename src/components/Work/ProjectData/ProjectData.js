import React from 'react';
import classes from './ProjectData.css';

const projectData = (props) => {
    let scrollUp = props.scrollUp, scrollDown = props.scrollDown;
    let header = props.projectInfo.header;
    let briefInfo = props.projectInfo.briefInfo;
    let description = props.projectInfo.description;
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
    return (
      <div
        onMouseMove={props.mouseMove} 
        className={classes.ProjectDataWrp}>
        <div className={classes.LeftSide}></div>
        <div className={classes.RightSide}>
          <div className={classes.Header}>{header.translate}</div>
          <div className={classes.Content}>
            <div className={caseAttachedClasses.join(' ')}>{briefInfo.translate}</div>
            <div className={titleAttachedClasses.join(' ')}>{props.projectInfo.title}</div>
            <div className={briefInfoAttachedClasses.join(' ')}>{briefInfo.briefInfo}</div>
            <div className={descriptionAttachedClasses.join(' ')}>{description.translate}</div>
          </div>
        </div>
      </div>
    )
}

export default projectData;
