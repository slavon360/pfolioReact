import * as actionTypes from '../actions/actionTypes';
import { defineScrollValue } from '../utility';

const initialState = {
    showDpDwnView: false,
    showDpDwnLanguages: false,
    handClosedMenu: false,
    openedMenu: false,
    currentWorkIndex: 0,
    scrollUp: {value: false, toggle: null},
    scrollDown: {value: false, toggle: null},
    worksSection: {
      listView: true,
      gridView: false
    }
}
const toggleDrawer = (state) => {
    return {
      ...state,
      openedMenu: !state.openedMenu,
      handClosedMenu: !!state.openedMenu
    }
}
const scrollWorkDown = (state, action) => {
    let currentIndex = state.currentWorkIndex, worksNumber = action.worksNumber;
    currentIndex+=1;
    worksNumber < currentIndex && (currentIndex = 0);
    let scrollDown = defineScrollValue(state.scrollDown);
    let scrollUp = {...state.scrollUp, value: false};
    return {
      ...state,
      currentWorkIndex: currentIndex,
      scrollDown: scrollDown,
      scrollUp: scrollUp
    }
}
const scrollWorkUp = (state, action) => {
    let currentIndex = state.currentWorkIndex, worksNumber = action.worksNumber;
    currentIndex-=1;
    currentIndex < 0 && (currentIndex = worksNumber);
    let scrollUp = defineScrollValue(state.scrollUp);
    let scrollDown = {...state.scrollDown, value: false};
    return {
      ...state,
      currentWorkIndex: currentIndex,
      scrollUp: scrollUp,
      scrollDown: scrollDown
    }
}
const switchToListView = (state) => {
    return {
      ...state,
      worksSection: { listView: true, gridView: false }
    }
}
const switchToGridView = (state) => {
    return {
      ...state,
      worksSection: { listView: false, gridView: true }
    }
}
const showHideViewDpDwn = (state, action) => {
    return {
      ...state,
      [action.propName]: !state[action.propName]
    }
}
const hideViewDpDwn = (state, action) => {
    return {
      ...state,
      [action.propName]: false
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.DRAWER_TOGGLE:
        return toggleDrawer(state);
      case actionTypes.SCROLL_WORK_DOWN:
        return scrollWorkDown(state, action);
      case actionTypes.SCROLL_WORK_UP:
        return scrollWorkUp(state, action);
      case actionTypes.SWITCH_TO_LIST_VIEW:
        return switchToListView(state);
      case actionTypes.SWITCH_TO_GRID_VIEW:
        return switchToGridView(state);
      case actionTypes.SHOW_HIDE_VIEW_DP_DWN:
        return showHideViewDpDwn(state, action);
      case actionTypes.HIDE_VIEW_DP_DWN:
        return hideViewDpDwn(state, action);
      default: return state;
    }
}

export default reducer;
