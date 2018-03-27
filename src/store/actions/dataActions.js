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
export const submitClientStart = () => {
    return {
      type: actionTypes.SUBMIT_CLIENT_START
    }
}
export const submitClientDataSuccess = (clientData) => {
    return {
      type: actionTypes.SUBMIT_CLIENT_DATA_SUCCESS,
      clientData: clientData,
      showSuccess: true
    }
}
export const hideSuccessIcon = () => {
    return {
      type: actionTypes.HIDE_SUCCESS_ICON
    }
}
export const submitClientDataFail = (error) => {
    return {
      type: actionTypes.SUBMIT_CLIENT_DATA_FAIL,
      error: error,
      showFailure: true
    }
}
export const hideFailureIcon = () => {
    return {
      type: actionTypes.HIDE_FAILURE_ICON
    }
}
export const submitClientData = (clientData) => {
    return dispatch => {
        dispatch(submitClientStart());
        axiosPfolio.post('/clients.json', clientData)
                    .then(response => {
                      dispatch(submitClientDataSuccess(clientData));
                      window.setTimeout(() => {
                        dispatch(hideSuccessIcon());
                      }, 4000);
                    })
                    .catch(error => {
                      dispatch(submitClientDataFail(error));
                      window.setTimeout(() => {
                        dispatch(hideFailureIcon());
                      }, 4000);
                    })
    }
}
