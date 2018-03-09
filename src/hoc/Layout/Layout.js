import React, { Component } from 'react';
import { connect } from 'react-redux';
import Adj from '../Adj/AdjComponent';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import LanguagesDpDwn from '../../components/LanguagesDpDwn/LanguagesDpDwn';
import Preloader from '../../components/UI/Preloader/Preloader';
import * as actions from '../../store/actions/index'
import classes from './Layout.css';

class Layout extends Component {
    componentDidMount(){
      if (!this.props.menuKeys){
        this.props.onfetchPfolioData();
      }
    }
    componentDidUpdate(){
    }
    shouldComponentUpdate(nextProps, nextState){
      //console.log('[Layout] shouldComponentUpdate', this.props);
      return true;
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
              selectedProp="showDpDwnLanguages"
              showDpDwnLanguages={this.props.showDpDwnLanguages}
              languages={this.props.languages}
              showHideViewDpDwn={this.props.onShowHideViewDpDwn}
              hideViewDpDwn={this.props.onHideViewDpDwn}
              selectLanguage={this.props.onSelectLanguage}/>
            <SideDrawer
              openedMenu={this.props.openedMenu}
              menuKeys={this.props.menuKeys}
              toggleDrawer={this.props.onToggleDrawer}/>
            <main
              className={wrpClasses.join(' ')}>
              {this.props.children}
            </main>
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
      onfetchPfolioData: () => dispatch(actions.fetchPfolioData()),
      onSelectLanguage: (lang) => dispatch(actions.selectLanguage(lang)),
      onShowHideViewDpDwn: (propName) => dispatch(actions.showHideViewDpDwn(propName)),
      onHideViewDpDwn: (propName) => dispatch(actions.hideViewDpDwn(propName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
