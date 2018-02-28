import * as actionTypes from './actionTypes';

export const toggleDrawer = () => {
    return {
      type: actionTypes.DRAWER_TOGGLE
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
export const setWorkOpened = (val) => {
    return {
      type: actionTypes.SET_WORK_OPENED,
      value: val
    }
}
