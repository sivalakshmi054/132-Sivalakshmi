import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//nested components

function MyHello(props){
  return <h1>Hi this is MyHello.</h1>
}

function YourHello(props){
  return <h1>Hi this is YourHello.</h1>
}

function SayHello(props){
  const display = props.isTrue;
  console.log(display);

  if(display){
    return <MyHello />
  }else{
    return <YourHello />
  }
}

ReactDOM.render(  
  <SayHello isTrue={true} /> ,
document.getElementById('root')
);