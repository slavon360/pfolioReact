import React from 'react';
import classes from './LanguagesDpDwn.css';


const languagesDpDwn = (props) => {
    let languagesDpDwnClasses = [classes.LanguagesDpDwn, classes.LanguagesDpDwnInactive];
    props.showDpDwnLanguages && (languagesDpDwnClasses = [classes.LanguagesDpDwn, classes.LanguagesDpDwnActive]);
    let selectedLanguage;
    let options = props.languages.map((lang) => {
                    lang.selected && (selectedLanguage = lang.language);
                    return (<div
                                onClick={() => {props.selectLanguage(lang.dataName)}}
                                className={classes.Language}
                                key={lang.dataName}>
                                {lang.language}
                            </div>)
                  });
      return (
        <div className={languagesDpDwnClasses.join(' ')}>
          <button
            className={classes.LanguagesContainer}
            onBlur={() => {props.hideViewDpDwn(props.selectedProp)}}
            onClick={() => {props.showHideViewDpDwn(props.selectedProp)}}>
            {selectedLanguage}
          </button>
            <div className={classes.LanguagesSet}>
              <div className={classes.LanguagesSetContainer}>
                {options}
              </div>
            </div>
        </div>
      )
}

export default languagesDpDwn;
