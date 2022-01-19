import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Timer(){
  const element = (
    <div>
      <h1>Current Time is </h1>
      <h2>It  is {new Date().toLocaleString()}</h2>
    </div>
  );

  return element;
}


ReactDOM.render(  
    <Timer /> ,
  document.getElementById('root')
);