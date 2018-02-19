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
