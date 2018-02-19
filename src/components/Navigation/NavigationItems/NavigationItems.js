import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
          let attachedClasses = [classes.NavigationItems, classes.NavigationItemsInactive];
          if (props.openedMenu) {
            attachedClasses = [classes.NavigationItems, classes.NavigationItemsActive];
          }
          let navItems = props.menuKeys.map((key, index) => {
            return <NavigationItem
                      key={index}
                      link={'/'+key.link}
                      toggleDrawer={props.toggleDrawer}>
                      {key.title}
                    </NavigationItem>
          })
          return (
              <ul className={attachedClasses.join(' ')}>
                <div className={classes.NavHead}>Navigation</div>
                {navItems}
              </ul>
          )
        }

export default navigationItems;
