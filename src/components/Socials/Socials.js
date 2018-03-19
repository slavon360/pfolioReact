import React, { Component } from 'react';
import classes from './Socials.css';
import FacebookIcon from '../../assets/svg/Facebook/Facebook';
import GithubIcon from '../../assets/svg/Github/Github';
import LinkedinIcon from '../../assets/svg/Linkedin/Linkedin';
import TwitterIcon from '../../assets/svg/Twitter/Twitter';

class Socials extends Component{
      state = {
        Facebook: null,
        Linkedin: null,
        Twitter: null,
        Github: null
      }
      setElementParams (event, element) {
        let params = event.target.getClientRects()[0];
        let sectionLength = params.width/3;
        let elementParams = {
          leftSection: params.left,
          middleSection: params.left + sectionLength,
          rightSectionBegin: params.left + sectionLength*2,
          rightSectionEnd: params.right,
          position: null,
          classNames: [classes[element]]
        }
        this.setState({[element]: elementParams});
      }
      setElementPosition (xCoord, element, name) {
        if (xCoord > element.leftSection && xCoord < element.middleSection){
          let currentPosition = 'LeftPositioned';
          this.state[name].position !== currentPosition && this.setState({
                  [name]: {...this.state[name],
                  position: currentPosition,
                  classNames: [classes[name], classes[currentPosition]]
                }});
        }
        else if (xCoord > element.middleSection && xCoord < element.rightSectionBegin){
          let currentPosition = 'MiddlePositioned';
          this.state[name].position !== currentPosition && this.setState({
                  [name]: {...this.state[name],
                  position: currentPosition,
                  classNames: [classes[name], classes[currentPosition]]
                }});
        }
        else if (xCoord > element.rightSectionBegin && xCoord < element.rightSectionEnd){
          let currentPosition = 'RightPositioned';
          this.state[name].position !== currentPosition && this.setState({
                  [name]: {...this.state[name],
                  position: currentPosition,
                  classNames: [classes[name], classes[currentPosition]]
                }});
        }
      }
      onLeaveButton = (event, element) => {
        this.setState({
                    [element]: {
                      ...this.state[element],
                      classNames: [classes[element]],
                      position: null
                    }
                  })
      }
      onHoverButton = (event, element) => {
        !this.state[element] && this.setElementParams(event, element);
        this.state[element] && this.setElementPosition(event.screenX, this.state[element], element);
      }
      componentDidUpdate(){
        console.log('updated!!!!!')
      }
      render(){
        let contact = this.props.contact;
        let facebookClasses = this.state.Facebook ? this.state.Facebook.classNames : [classes.Facebook];
        let linkedinClasses = this.state.Linkedin ? this.state.Linkedin.classNames : [classes.Linkedin];
        let twitterClasses = this.state.Twitter ? this.state.Twitter.classNames : [classes.Twitter];
        let githubClasses = this.state.Github ? this.state.Github.classNames : [classes.Github];
        return (
          <div className={classes.SocialsWrp}>
            <h3 className={classes.SocialHead}>{contact.socialHead}</h3>
            <p className={classes.SocialDescription}>{contact.socialDescription}</p>
            <a  onMouseMove={(event) => {this.onHoverButton(event, 'Facebook')}}
                onMouseLeave={(event) => {this.onLeaveButton(event, 'Facebook')}}
                className={facebookClasses.join(' ')}
                href="https://www.facebook.com/viacheslav360"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="1">
              <div className={classes.Container}>
                <span><FacebookIcon /></span>
                facebook
              </div>
              <div className={classes.ShadowOne}></div>
              <div className={classes.ShadowTwo}></div>
            </a>
            <a  onMouseMove={(event) => {this.onHoverButton(event, 'Linkedin')}}
                onMouseLeave={(event) => {this.onLeaveButton(event, 'Linkedin')}}
                className={linkedinClasses.join(' ')}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="1"
                href="https://www.linkedin.com/in/viacheslav-liakh/">
              <div className={classes.Container}>
                <span><LinkedinIcon /></span>
                linkedin
              </div>
              <div className={classes.ShadowOne}></div>
              <div className={classes.ShadowTwo}></div>
            </a>
            <a  onMouseMove={(event) => {this.onHoverButton(event, 'Twitter')}}
                onMouseLeave={(event) => {this.onLeaveButton(event, 'Twitter')}}
                className={twitterClasses.join(' ')}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="1"
                href="https://twitter.com/slavon360">
              <div className={classes.Container}>
                <span><TwitterIcon /></span>
                twitter
              </div>
              <div className={classes.ShadowOne}></div>
              <div className={classes.ShadowTwo}></div>
            </a>
            <a  onMouseMove={(event) => {this.onHoverButton(event, 'Github')}}
                onMouseLeave={(event) => {this.onLeaveButton(event, 'Github')}}
                className={githubClasses.join(' ')}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="1"
                href="https://github.com/slavon360">
              <div className={classes.Container}>
                <span><GithubIcon />github</span>
              </div>
              <div className={classes.ShadowOne}></div>
              <div className={classes.ShadowTwo}></div>
            </a>
          </div>
        )
      }
}

export default Socials;
