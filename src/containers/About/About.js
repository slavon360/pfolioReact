import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './About.css';

class About extends Component{
    render(){
      let pfolioData = this.props.pfolioData, curLang = this.props.selectedLanguage;
      let greeting1 = pfolioData[curLang].menu.About.greeting1;
      let greeting2 = pfolioData[curLang].menu.About.greeting2;
      let briefInfo = pfolioData[curLang].menu.About.info;
      let checkout = pfolioData[curLang].menu.About.checkout;
      let works = pfolioData[curLang].menu.About.works;
      return(
            <div className={classes.AboutWrp}>
              <div className={classes.LeftSide}>
                Slavon360
              </div>
              <div className={classes.RightSide}>
                <h1 className={classes.Greeting}>{greeting1}</h1>
                <h1 style={{marginTop: '10px'}}>{greeting2}</h1>
                <h2 className={classes.BriefInfo}>{briefInfo}</h2>
                <div className={classes.WorksLink}>{checkout}
                  <NavLink to="/works" style={{color: '#fff', textDecoration: 'none'}}> {works}</NavLink>
                </div>
              </div>
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
