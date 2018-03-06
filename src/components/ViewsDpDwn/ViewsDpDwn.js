import React from 'react';
import classes from './ViewsDpDwn.css';

const viewsDpDwn = (props) =>  {
      console.log('viewsDpDwn')
      let ViewList = (
                      <div
                        onClick={props.switchToListView}
                        className={classes.ViewList}>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    );
      let ViewGrid = (
                      <div
                        onClick={props.switchToGridView}
                        className={classes.ViewGrid}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    );
      let selectedView = props.gridView ? ViewGrid : ViewList;
      let viewsDpDwnWrpClasses = [classes.ViewsDpDwnWrp];
      let viewsDpDwnOptionsClasses = [classes.ViewsDpDwnOptions, classes.ViewsDpDwnOptionsHiden];
      props.showDpDwnView && (viewsDpDwnWrpClasses = [classes.ViewsDpDwnWrp, classes.ViewsDpDwnWrpActive]);
      props.showDpDwnView && (viewsDpDwnOptionsClasses = [classes.ViewsDpDwnOptions, classes.ViewsDpDwnOptionsShow]);
        return (
          <div className={viewsDpDwnWrpClasses.join(' ')}>
            <button
              onBlur={() => {
                window.setTimeout(() => {props.hideViewDpDwn(props.selectedProp)}, 150) }}
              onClick={() => {props.showHideViewDpDwn(props.selectedProp)}}
              className={classes.ViewsDpDwnSelected}>
              {selectedView}
            </button>
            <div className={viewsDpDwnOptionsClasses.join(' ')}>
              {ViewList}
              {ViewGrid}
            </div>
          </div>
        );
};

export default viewsDpDwn;
