import React, { Component } from 'react';
import classes from './NavArrow.css';

class navArrow extends Component{
        state = {
          currentDate: Date.now()
        }
        render(){
          let attachedClasses = [classes.NavArrow];
          let scrollWork = this.props.scrollWorkUp || this.props.scrollWorkDown;
          this.props.upsideDown && (attachedClasses = [classes.NavArrow, classes.NavArrowUpsideDown]);
          let clickHandler = (worksNumber, e) => {
                let event = {screenX: e.screenX, screenY: e.screenY};
                if (Date.now() - this.state.currentDate > 1000) {
                  this.setState({currentDate: Date.now()}, () => {
                      scrollWork(worksNumber, event);
                  })
                };
          }
          return (
                <div onClick={(e) => { clickHandler(this.props.worksNumber, e) }} className={attachedClasses.join(' ')}></div>
              )
        }
}

export default navArrow;
