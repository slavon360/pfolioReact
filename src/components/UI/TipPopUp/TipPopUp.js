import React from 'react';

const tipPopUp = (props) => (
    <div className={props.classes.TipPopUpWrp}>
      <div className={props.classes.Head}>{props.topInfo}</div>
      <div className={props.classes.Bottom}>{props.bottomInfo}</div>
    </div>
)

export default tipPopUp;
