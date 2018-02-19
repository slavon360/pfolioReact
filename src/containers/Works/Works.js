import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Work from '../../components/Work/Work';
import ScrollNav from '../../components/Navigation/ScrollNav/ScrollNav';
import classes from './Works.css';

class Works extends Component{
    state = {
      windowWidth: 0,
      windowHeight: 0
    }

    componentDidMount(){
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount(){
      console.log('WORKS [componentWillUnmount]')
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }, () => {
        //callback
      })
    }

    render(){
      let works = this.props.works.map((work, index, worksArr) => {
          let translateYPosition = this.state.windowHeight * (index - this.props.currentWorkIndex);
          work.translateYPosition = translateYPosition;
          console.log(work.translateYPosition);
          if (this.props.currentWorkIndex === 0 && index === worksArr.length-1) {

          }
          return <Work
                  translateYPosition={work.translateYPosition}
                  key={work.title}
                  workData={work}/>
      })
      return (
              <div className={classes.WorksWrp}>
                {works}
                <ScrollNav
                  worksNumber={this.props.works.length-1}
                  scrollWorkDown={this.props.onScrollWorkDown}
                  scrollWorkUp={this.props.onScrollWorkUp}/>
              </div>
            );
    }
}
const mapStateToProps = (state) => {
    return {
      works: state.dataReducer.works,
      currentWorkIndex: state.uireducer.currentWorkIndex
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onScrollWorkUp: (worksNumber) => dispatch(actions.scrollWorkUp(worksNumber)),
      onScrollWorkDown: (worksNumber) => dispatch(actions.scrollWorkDown(worksNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works);
