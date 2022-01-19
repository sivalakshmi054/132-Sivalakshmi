import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function tick(){
  const Element = (
    <div>
      <h1>Current Time is </h1>
      <h2>It  is {new Date().toLocaleString()}</h2>
    </div>
  );

  ReactDOM.render(Element ,document.getElementById('root')
  );
}

setInterval(tick,1000);