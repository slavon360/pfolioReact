import axiosPfolio from '../../axios-pfolio';
import * as actionTypes from './actionTypes';

export const fetchMenuDataSuccess = (pfolioData, menuLang) => {
    let currentMenu = pfolioData[menuLang].menu;
    return {
        type: actionTypes.FETCH_MENU_DATA_SUCCESS,
        currentMenu: currentMenu
    }
}
export const fetchMenuDataFail = (error) => {
    return {
        type: actionTypes.FETCH_MENU_DATA_FAIL,
        error: error
    }
}
export const fetchPfolioDataSuccess = (pfolioData) => {
    return {
      type: actionTypes.FETCH_PFOLIO_DATA_SUCCESS,
      pfolioData: pfolioData
    }
}
export const fetchPfolioData = () => {
    return (dispatch) => {
        axiosPfolio.get('.json')
          .then((res) => {
            dispatch(fetchPfolioDataSuccess(res.data));
            dispatch(fetchMenuDataSuccess(res.data, 'pfolioEn'));
          })
          .catch(err => {
            dispatch(fetchMenuDataFail(err));
          })
    }
}
const setLanguage = (lang) => {
    return {
      type: actionTypes.SELECT_LANGUAGE,
      language: lang
    }
}
export const selectLanguage = (lang) => {
    if (lang && typeof lang === 'string'){
      return setLanguage(lang);
    }
}
