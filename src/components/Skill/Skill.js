import React from 'react';
import AnimationCount from 'react-count-animation';
import classes from './Skill.css';

const skill = (props) => {
        let tech = props.skill.title.toLowerCase(), imgSrc, percents = props.skill.percents;
        let indicatorClasses = [classes.SkillIndicator];
        percents < 45 && (indicatorClasses = [classes.SkillIndicator, classes.Low]);
        percents >= 45 && percents < 75 && (indicatorClasses = [classes.SkillIndicator, classes.Medium]);
        percents >= 75 && percents <= 100 && (indicatorClasses = [classes.SkillIndicator, classes.Hight]);
        tech && (imgSrc = require('../../assets/images/skills/' + tech + '.png'));
        const params = {
            start: 0,
            count: percents,
            duration: props.animDuration,
            decimals: 0,
            animation: 'up'
        }
        return (
          <div className={classes.SkillWrp}>
            <div className={classes.SkillContent}>
              <div className={classes.SkillTitle}>
                {props.skill.title}
              </div>
              <img
                src={imgSrc}
                alt={tech} />
            </div>
            <div className={classes.SkillIndicatorWrp}>
              <div className={classes.SkillIndicatorBar} style={{width: percents + '%'}}>
                <div
                  className={indicatorClasses.join(' ')}
                  style={{animationDuration: props.animDuration/1000 - 0.8 + 's'}}></div>
              </div>
              <div className={classes.AnimationCount}>
                <AnimationCount {...params} />
              </div>
            </div>
          </div>
        )
}

export default skill;
