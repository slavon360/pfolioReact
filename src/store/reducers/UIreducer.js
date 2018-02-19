import * as actionTypes from '../actions/actionTypes';

const initialState = {
    handClosedMenu: false,
    openedMenu: false,
    currentWorkIndex: 0
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
    console.log(currentIndex)
    return {
      ...state,
      currentWorkIndex: currentIndex
    }
}
const scrollWorkUp = (state, action) => {
    let currentIndex = state.currentWorkIndex, worksNumber = action.worksNumber;
    currentIndex-=1;
    currentIndex < 0 && (currentIndex = worksNumber);
    console.log(currentIndex)
    return {
      ...state,
      currentWorkIndex: currentIndex
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
      default: return state;
    }
}

export default reducer;
