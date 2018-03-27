import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import Adj from '../Adj/AdjComponent';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import LanguagesDpDwn from '../../components/LanguagesDpDwn/LanguagesDpDwn';
import Preloader from '../../components/UI/Preloader/Preloader';
import * as actions from '../../store/actions/index'
import classes from './Layout.css';

class Layout extends Component {
    state = {
      isWorksPath: false,
      currentDate: Date.now()
    }
    componentDidMount(){
      if (!this.props.menuKeys){
        this.props.onfetchPfolioData();
      }
    }
    componentDidUpdate(){
      window.location.pathname === '/works' && !this.state.isWorksPath && this.setState({isWorksPath: true});
      window.location.pathname !== '/works' && this.state.isWorksPath && this.setState({isWorksPath: false});
    }
    shouldComponentUpdate(nextProps, nextState){
      return true;
    }
    swipingRight = (e, absX) => {
      if (Date.now() - this.state.currentDate > 1500){
        this.setState({currentDate: Date.now()}, () => { this.props.onOpenMenu() });
      }
    }
    swipingLeft = () => {
      if (Date.now() - this.state.currentDate > 1500){
        this.setState({currentDate: Date.now()}, () => { this.props.onCloseMenu() });
      }
    }
    render(){
      let content = <Preloader />;
      let wrpClasses = [classes.LayoutWrp, classes.LayoutWrpInactive];
      if (!this.props.openedMenu) {
        wrpClasses = [classes.LayoutWrp, classes.LayoutWrpActive];
      }
      if (this.props.menuKeys){
        content = (
          <Adj>
            <DrawerToggle
              handClosedMenu={this.props.handClosedMenu}
              openedMenu={this.props.openedMenu}
              toggleDrawer={this.props.onToggleDrawer}/>
            <LanguagesDpDwn
              isWorksPath={this.state.isWorksPath}
              selectedProp="showDpDwnLanguages"
              showDpDwnLanguages={this.props.showDpDwnLanguages}
              languages={this.props.languages}
              showHideViewDpDwn={this.props.onShowHideViewDpDwn}
              hideViewDpDwn={this.props.onHideViewDpDwn}
              selectLanguage={this.props.onSelectLanguage}/>
            <SideDrawer
              openedMenu={this.props.openedMenu}
              menuKeys={this.props.menuKeys}
              toggleDrawer={this.props.onToggleDrawer}
              swipingLeft={this.swipingLeft} />
              <Swipeable
                onSwipingRight={this.swipingRight}>
                <main
                  className={wrpClasses.join(' ')}>
                  {this.props.children}
                </main>
              </Swipeable>
          </Adj>
        )
      }
      return(
        <Adj>
            {content}
        </Adj>
      )
    }
}
const mapStateToProps = state => {
    return {
      showDpDwnLanguages: state.uireducer.showDpDwnLanguages,
      openedMenu: state.uireducer.openedMenu,
      handClosedMenu: state.uireducer.handClosedMenu,
      menuKeys: state.dataReducer.menuKeys,
      languages: state.dataReducer.languages,
      error: state.dataReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onToggleDrawer: () => dispatch(actions.toggleDrawer()),
      onOpenMenu: () => dispatch(actions.openMenu()),
      onCloseMenu: () => dispatch(actions.closeMenu()),
      onfetchPfolioData: () => dispatch(actions.fetchPfolioData()),
      onSelectLanguage: (lang) => dispatch(actions.selectLanguage(lang)),
      onShowHideViewDpDwn: (propName) => dispatch(actions.showHideViewDpDwn(propName)),
      onHideViewDpDwn: (propName) => dispatch(actions.hideViewDpDwn(propName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
