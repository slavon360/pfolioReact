import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
      let middleDash = [classes.ZeroDeg];
      let upperDash = [classes.UpperDash];
      let bottomDash = [classes.BottomDash];
      props.openedMenu && (bottomDash = [classes.BottomDash, classes.BottomDashJump]);
      props.handClosedMenu && (bottomDash = [classes.BottomDash, classes.BottomDashJumpClose]);
      props.openedMenu && (upperDash = [classes.UpperDash, classes.UpperDashJump]);
      props.handClosedMenu && (upperDash = [classes.UpperDash, classes.UpperDashJumpClose]);
      middleDash = props.openedMenu ? [classes.ZeroDeg, classes.ClockWise] : [classes.ZeroDeg, classes.CounterClockWise];
      return (<div
                onClick={() => props.toggleDrawer()}
                className={classes.DrawerToggleWrp}>
                <div className={classes.DrawerToggleContainer}>
                  <div className={upperDash.join(' ')}></div>
                  <div className={middleDash.join(' ')}></div>
                  <div className={bottomDash.join(' ')}></div>
                </div>
              </div>
          )
}

export default drawerToggle;
