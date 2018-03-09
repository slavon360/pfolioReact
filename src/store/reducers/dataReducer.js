import * as actionTypes from '../actions/actionTypes';
import { objIntoArray } from '../utility';

const initialState = {
    loading: false,
    pfolioData: null,
    menuKeys: null,
    works: null,
    selectedLanguage: 'pfolioEn',
    languages: [
                {language: 'EN', dataName:'pfolioEn', selected: true},
                {language: 'UA', dataName:'pfolioUa', selected: false},
                {language: 'FR', dataName:'pfolioFr', selected: false}
              ],
    error: false,
    clientData: null,
    showSuccess: false,
    showFailure: false
}
const fetchMenuDataSuccess = (state, action) => {
      let menuKeys = [], currentMenu = action.currentMenu;
      for (let key in currentMenu){
        menuKeys.push({title: currentMenu[key].translate, link: currentMenu[key].link});
      }
      return {
        ...state,
        menuKeys: menuKeys
      }
}
const fetchMenuDataFail = (state, action) => {
      return {
        ...state,
        error: action.error
      }
}
const updateMenuKeys = (pfolioData, language) => {
      let updatedMenuKeys = [], menu = pfolioData[language].menu;
      for (let key in menu){
        updatedMenuKeys.push({title: menu[key].translate, link: menu[key].link});
      }
      return updatedMenuKeys;
}
const updateWorks = (pfolioData, selectedLanguage) => {
      let updatedWorks = pfolioData[selectedLanguage].menu.Works.works;
      let updatedWorksArray = objIntoArray(updatedWorks);
      return updatedWorksArray;
}
const selectLanguage = (state, action) => {
      let updatedLanguages = [ ...state.languages ];
      updatedLanguages = updatedLanguages.map((lang) => {
        return { ...lang };
      })
      updatedLanguages.map((lang) => {
        lang.selected = lang.dataName === action.language ? true : false;
        return lang;
      });
      let updatedMenuKeys = updateMenuKeys(state.pfolioData, action.language);
      let updatedWorks = updateWorks(state.pfolioData, action.language);
      return {
        ...state,
        languages: updatedLanguages,
        menuKeys: updatedMenuKeys,
        selectedLanguage: action.language,
        works: updatedWorks
      }
}
const fetchPfolioDataSuccess = (state, action) => {
      let works = action.pfolioData.pfolioEn.menu.Works.works;
      let worksArray = objIntoArray(works);
      return {
        ...state,
        pfolioData: action.pfolioData,
        works: worksArray
      }
}
const submitClientStart = (state) => {
      return {
        ...state,
        loading: true
      }
}
const submitClientDataSuccess = (state, action) => {
      return {
        ...state,
        loading: false,
        clientData: action.clientData,
        showSuccess: action.showSuccess
      }
}
const hideSuccessIcon = (state) => {
      return {
        ...state,
        showSuccess: false
      }
}
const submitClientDataFail = (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error,
        showFailure: action.showFailure
      }
}
const hideFailureIcon = (state) => {
      return {
        ...state,
        showFailure: false
      }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MENU_DATA_SUCCESS:
            return fetchMenuDataSuccess(state, action);
        case actionTypes.FETCH_MENU_DATA_FAIL:
            return fetchMenuDataFail(state, action);
        case actionTypes.SELECT_LANGUAGE:
            return selectLanguage(state, action);
        case actionTypes.FETCH_PFOLIO_DATA_SUCCESS:
            return fetchPfolioDataSuccess(state, action);
        case actionTypes.SUBMIT_CLIENT_START:
            return submitClientStart(state);
        case actionTypes.SUBMIT_CLIENT_DATA_SUCCESS:
            return submitClientDataSuccess(state, action);
        case actionTypes.SUBMIT_CLIENT_DATA_FAIL:
            return submitClientDataFail(state, action);
        case actionTypes.HIDE_SUCCESS_ICON:
            return hideSuccessIcon(state);
        case actionTypes.HIDE_FAILURE_ICON:
            return hideFailureIcon(state);
        default: return state;
    }
}

export default reducer;
