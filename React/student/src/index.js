import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//function based component and class based component difference is -->state
//function based component are stateles
//class based component are stateful

//React Hooks
// technique to use stateful behaviour in function based components
//useState Hook
//Returns a stateful value, and a function to update it.

function MyCalculatorWithHook(props){

  const[first,setFirst] = useState(props.a);
  const[second,setSecond] = useState(props.b);
  const[result,setResult] = useState(0);

  const handleResult = () =>{
    setResult(parseInt(first)+parseInt(second));
  }

  return(
    <div>
      <p>Addition od {first} and {second} is {result}</p>
      <button onClick={handleResult}>Addition</button>
    </div>
  );

}

ReactDOM.render(  
  <MyCalculatorWithHook a="10" b="20" /> ,
document.getElementById('root')
);
