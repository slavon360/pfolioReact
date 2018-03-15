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
        sortMenuOpen: false,
        selectedSort: false,
        skills: []
      }
      componentDidMount(){
        let pfolioData = this.props.pfolioData;
        let selectedLanguage = this.props.selectedLanguage;
        let skills = objIntoArray(pfolioData[selectedLanguage].menu.Skills.skills);
        let skillsCopy = skills.slice();
        let ascendingSkills = skillsCopy.sort((skill, nextSkill) => {
          return nextSkill.percents - skill.percents;
        });
        skillsCopy.forEach((skill, index, arr) => {
          skill.ascendingOrder = index+1;
          skill.descendingOrder = arr.length - index;
        })
        this.setState({skills: ascendingSkills, selectedSort: <AscendingIcon value={'ascending'} text={'by skills '}/>});
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
      onSortSkills = (param) => {
        this.setState({selectedSort: param});
      }
      render(){
        let selectedSortValue =  this.state.selectedSort ? this.state.selectedSort.props.value : false;
        let sortParams = [<AscendingIcon value={'ascending'} text={'by skills '}/>,
                          <DescendingIcon value={'descending'} text={'by skills '}/>,
                          <div value={'front end'} style={{textAlign: 'center'}}>front end</div>,
                          <div value={'back end'} style={{textAlign: 'center'}}>back end</div>];
        let pfolioData = this.props.pfolioData;
        let selectedLanguage = this.props.selectedLanguage;
        let skillWrpClasses = [classes.SkillWrpOuter];
        let skillWrpOuterSlyles = {};
        let skills = this.state.skills.map((skill) => {
          selectedSortValue === 'ascending' && (skillWrpOuterSlyles = {order: skill.ascendingOrder});
          selectedSortValue === 'descending' && (skillWrpOuterSlyles = {order: skill.descendingOrder});
          skillWrpClasses = skill.type === selectedSortValue || selectedSortValue === 'ascending' || selectedSortValue === 'descending' ? [classes.SkillWrpOuter] : [classes.SkillWrpOuter, classes.SkillHidden];
          !selectedSortValue && (skillWrpClasses = [classes.SkillWrpOuter]);
          return  <div
                    className={skillWrpClasses.join(' ')}
                    key={skill.title}
                    style={skillWrpOuterSlyles}>
                    <Skill skill={skill} animDuration={3000} />
                  </div>
        })
        return (<div className={classes.SkillsWrp}>
                  <SortComponent
                    selectedSort={this.state.selectedSort}
                    sortSkills={this.onSortSkills}
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
