import React from 'react';
import classes from './SortComponent.css';


const sortComponent = (props) => {
      let params = props.params.map((param, index) => {
        return <div onClick={() => {props.sortSkills(param)}} key={index} className={classes.ParamWrp}>{param}</div>
      });
      let activeParam = props.selectedSort;
      let SortComponentWrpClasses = [classes.SortComponentWrp, classes.SortComponentWrpInactive];
      props.sortMenuOpen && (SortComponentWrpClasses = [classes.SortComponentWrp, classes.SortComponentWrpActive]);

      return(
        <div className={SortComponentWrpClasses.join(' ')}>
          <span className={classes.SortWord}>Sort:</span>
          <button
            onBlur={() => {window.setTimeout(props.closeMenu, 150)}}
            onClick={props.toggleMenu}
            className={classes.SortButton}>{activeParam}</button>
          <div className={classes.SortContainer}>
            {params}
          </div>
        </div>
      );
}

export default sortComponent;
