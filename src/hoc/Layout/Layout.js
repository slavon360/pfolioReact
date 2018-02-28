import React, { Component } from 'react';
import { connect } from 'react-redux';
import Adj from '../Adj/AdjComponent';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import LanguagesDpDwn from '../../components/LanguagesDpDwn/LanguagesDpDwn';
import * as actions from '../../store/actions/index'
import classes from './Layout.css';

class Layout extends Component {
    componentDidMount(){
      if (!this.props.menuKeys){
        this.props.onfetchPfolioData();
      }
    }
    shouldComponentUpdate(nextProps, nextState){
      console.log('[Layout] shouldComponentUpdate', this.props);
      return true;
    }
    render(){
      let content = <div>Loading...</div>;
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
              languages={this.props.languages}
              selectLanguage={this.props.onSelectLanguage}/>
            <SideDrawer
              openedMenu={this.props.openedMenu}
              menuKeys={this.props.menuKeys}
              toggleDrawer={this.props.onToggleDrawer}/>
            <main
              className={wrpClasses.join(' ')}
              style={{overflowY: this.props.workOpened ? 'scroll' : 'hidden'}}>
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
      workOpened: state.uireducer.workOpened,
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
      onSelectLanguage: (lang) => dispatch(actions.selectLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
