import React from 'react';
import classes from './LanguagesDpDwn.css';


const languagesDpDwn = (props) => {
  let options = props.languages.map((lang) => {
                  return (<option key={lang.dataName} value={lang.dataName}>{lang.language}</option>)
                })
      return (
        <div className={classes.LanguagesDpDwn}>
          <select onChange={props.selectLanguage}>
            {options}
          </select>
        </div>
      )
}

export default languagesDpDwn;
