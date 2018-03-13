import React, { Component } from 'react';
import { connect } from 'react-redux';
import { objIntoArray } from '../../store/utility';
import Skill from '../../components/Skill/Skill';
import SortComponent from '../../components/SortComponent/SortComponent';
import AscendingIcon from '../../assets/svg/AscendingIcon/AscendingIcon';
import DescendingIcon from '../../assets/svg/DescendingIcon/DescendingIcon';
import classes from './Skills.css';

class Skills extends Component {
      state = {
        sortMenuOpen: false
      }
      toggleSortMenu = () => {
        this.setState((prevState) => {
          return {
            sortMenuOpen: !prevState.sortMenuOpen
          }
        })
      }
      closeSortMenu = () => {
        this.setState({sortMenuOpen: false});
      }
      render(){
        let sortParams = [<AscendingIcon />, <DescendingIcon />];
        let pfolioData = this.props.pfolioData;
        let selectedLanguage = this.props.selectedLanguage;
        let skills = objIntoArray(pfolioData[selectedLanguage].menu.Skills.skills);
        skills = skills.map((skill) => {
          return <Skill key={skill.title} skill={skill} animDuration={3000} />
        })
        return (<div className={classes.SkillsWrp}>
                  <SortComponent
                    closeMenu={this.closeSortMenu}
                    toggleMenu={this.toggleSortMenu}
                    params={sortParams}
                    sortMenuOpen={this.state.sortMenuOpen}/>
                  <h1 className={classes.Preface}>{pfolioData[selectedLanguage].menu.Skills.preface}</h1>
                  <div className={classes.SkillsContainer}>
                    {skills}
                  </div>
                </div>)
      }
}

const mapStateToProps = (state) => {
    return {
      pfolioData: state.dataReducer.pfolioData,
      selectedLanguage: state.dataReducer.selectedLanguage
    }
}

export default connect(mapStateToProps, null)(Skills);
