import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//working with lists in react

const mylist = [1,2,3,4,5];
const listelemnts = mylist.map( (i) =>

  <li key={i.toString()}>
    {i}
  </li>

);

ReactDOM.render(  
  <ul>{listelemnts}</ul> ,
document.getElementById('root')
);