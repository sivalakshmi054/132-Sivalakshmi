import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App1(props){

  return <h1>Hello {props.name}</h1>

}

function Addition(props){
  let result = props.a + props.b;
  return <h1>Addition of {props.a} and {props.b} is {result}</h1>
}

ReactDOM.render(  
    <Addition a="10" b="20"/> ,
  document.getElementById('root')
);