import * as actionTypes from '../actions/actionTypes';
import { objIntoArray } from '../utility';

const initialState = {
    pfolioData: null,
    menuKeys: null,
    works: null,
    selectedLanguage: 'pfolioEn',
    languages: [
                {language: 'EN', dataName:'pfolioEn', selected: true},
                {language: 'UA', dataName:'pfolioUa', selected: false},
                {language: 'FR', dataName:'pfolioFr', selected: false}
              ],
    error: false
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
        default: return state;
    }
}

export default reducer;
