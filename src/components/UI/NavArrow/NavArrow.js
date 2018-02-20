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
          let clickHandler = (worksNumber) => {
                if (Date.now() - this.state.currentDate > 1000) {
                  this.setState({currentDate: Date.now()}, () => {
                      scrollWork(worksNumber);
                  })
                };
          }
          return (
                <div onClick={() => { clickHandler(this.props.worksNumber) }} className={attachedClasses.join(' ')}></div>
              )
        }
}

export default navArrow;
