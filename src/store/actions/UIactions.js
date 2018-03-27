import * as actionTypes from './actionTypes';

export const toggleDrawer = () => {
    return {
      type: actionTypes.DRAWER_TOGGLE
    }
}
export const openMenu = () => {
    return {
      type: actionTypes.OPEN_MENU
    }
}
export const closeMenu = () => {
    return {
      type: actionTypes.CLOSE_MENU
    }
}
export const scrollWorkUp = (worksNumber) => {
    return {
      type: actionTypes.SCROLL_WORK_UP,
      worksNumber: worksNumber
    }
}
export const scrollWorkDown = (worksNumber) => {
    return {
      type: actionTypes.SCROLL_WORK_DOWN,
      worksNumber: worksNumber
    }
}
export const switchToGridView = () => {
    return {
      type: actionTypes.SWITCH_TO_GRID_VIEW
    }
}
export const switchToListView = () => {
    return {
      type: actionTypes.SWITCH_TO_LIST_VIEW
    }
}
export const showHideViewDpDwn = (propName) => {
    return {
      type: actionTypes.SHOW_HIDE_VIEW_DP_DWN,
      propName: propName
    }
}
export const hideViewDpDwn = (propName) => {
    return {
      type: actionTypes.HIDE_VIEW_DP_DWN,
      propName: propName
    }
}
