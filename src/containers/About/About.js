import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './About.css';

class About extends Component{
    render(){
      let pfolioData = this.props.pfolioData, curLang = this.props.selectedLanguage;
      let greeting = pfolioData[curLang].menu.About.greeting;
      let briefInfo = pfolioData[curLang].menu.About.info;
      return(
          <div className={classes.AboutWrp}>
            <h1 className={classes.Greeting}>{greeting}</h1>
            <p className={classes.BriefInfo}>{briefInfo}</p>
          </div>
      )
    }
}
const mapStateToProps = state => {
    return {
      pfolioData: state.dataReducer.pfolioData,
      selectedLanguage: state.dataReducer.selectedLanguage
    }
}

export default connect(mapStateToProps, null)(About);
