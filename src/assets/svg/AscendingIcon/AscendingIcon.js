import React from 'react';

const ascendingIcon = (props) => {
    return (
      <span>
        <span style={{paddingRight: '5px'}}>{props.text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="ascendingIcon"
          x="0px"
          y="0px"
          width="16px"
          height="16px"
          viewBox="0 0 219.432 219.431"
          style={{enableBackground:'new 0 0 219.432 219.431'}}>
          <g>
          	<path d="M43.663,151.055h48.61v68.376h-48.61V151.055z M104.863,219.431h48.586V107.845h-48.586V219.431z M166.062,61.07v158.361   h48.575V61.07H166.062z M142.857,80.1l6.62-80.1L69.363,6.41l22.091,22.157L4.793,114.976l29.282,29.389l86.676-86.41L142.857,80.1   z"/>
          </g>
        </svg>
      </span>
    );
}

export default ascendingIcon;
