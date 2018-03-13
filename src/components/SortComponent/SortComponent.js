import React from 'react';
import classes from './SortComponent.css';


const sortComponent = (props) => {
      let params = props.params.map((param) => {
        return <div className={classes.ParamWrp}>{param}</div>
      });
      let activeParam = 'None';
      let SortContainerClasses = [classes.SortContainer, classes.SortContainerHidden];
      props.sortMenuOpen && (SortContainerClasses = [classes.SortContainer, classes.SortContainerVisible]);

      return(
        <div className={classes.SortComponentWrp}>
          <span className={classes.SortWord}>Sort:</span>
          <button
            onBlur={() => {window.setTimeout(props.closeMenu, 150)}}
            onClick={props.toggleMenu}
            className={classes.SortButton}>{activeParam}</button>
          <div className={SortContainerClasses.join(' ')}>
            {params}
          </div>
        </div>
      );
}

export default sortComponent;
