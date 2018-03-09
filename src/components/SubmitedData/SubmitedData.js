import React from 'react';

const submitedData = (props) => {
      let dataArr = [];
      for (let key in props.clientData){
        props.clientData[key] && dataArr.push({
                                                key: key,
                                                value: props.clientData[key]
                                              });

      }
      return (
        <div>
          {dataArr.map((data) => {
            return (
              <div key={data.key}><span>{data.key} </span><span>{data.value}</span></div>
            )
          })}
        </div>
      )
}

export default submitedData;
