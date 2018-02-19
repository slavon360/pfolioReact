import React from 'react';
import BackWrapper from '../../UI/BackWrapper/BackWrapper';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawerContent, classes.SideDrawerContentInactive];
    if (props.openedMenu){
      attachedClasses = [classes.SideDrawerContent, classes.SideDrawerContentActive];
    }
    return (
      <BackWrapper openedMenu={props.openedMenu}>
        <div className={attachedClasses.join(' ')}>
          <NavigationItems
            openedMenu={props.openedMenu}
            menuKeys={props.menuKeys}
            toggleDrawer={props.toggleDrawer}/>
        </div>
      </BackWrapper>
    )
}

export default sideDrawer;
