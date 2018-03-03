import React, { Component } from 'react';
import classes from './ViewsDpDwn.css';

class ViewsDpDwn extends Component{
      shouldComponentUpdate(nextProps, nextState){
        let should = this.props.tempXAxis ? true : false;
        return should;
      }
      render(){
          console.log('viewsDpDwn');
          let ViewList = (
                          <div
                            onClick={this.props.switchToListView}
                            className={classes.ViewList}>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        );
          let ViewGrid = (
                          <div
                            onClick={this.props.switchToGridView}
                            className={classes.ViewGrid}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        );
          let selectedView = this.props.gridView ? ViewGrid : ViewList;
          let viewsDpDwnWrpClasses = [classes.ViewsDpDwnWrp];
          let viewsDpDwnOptionsClasses = [classes.ViewsDpDwnOptions, classes.ViewsDpDwnOptionsHiden];
          this.props.showDpDwnView && (viewsDpDwnWrpClasses = [classes.ViewsDpDwnWrp, classes.ViewsDpDwnWrpActive]);
          this.props.showDpDwnView && (viewsDpDwnOptionsClasses = [classes.ViewsDpDwnOptions, classes.ViewsDpDwnOptionsShow]);
          return (
            <div className={viewsDpDwnWrpClasses.join(' ')}>
              <button
                onBlur={() => {
                  window.setTimeout(() => {this.props.hideViewDpDwn(this.props.selectedProp)}, 150) }}
                onClick={() => {this.props.showHideViewDpDwn(this.props.selectedProp)}}
                className={classes.ViewsDpDwnSelected}>
                {selectedView}
              </button>
              <div className={viewsDpDwnOptionsClasses.join(' ')}>
                {ViewList}
                {ViewGrid}
              </div>
            </div>
          );
      }
};

export default ViewsDpDwn;
