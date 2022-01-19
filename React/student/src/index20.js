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
//Returns a stateful value, and a function to update it.

function MyComponentWithHook(props){

  const[counter,setCounter] = useState(0);

  return(
    <div>
      <p>Click me {counter} times.</p>
      <button onClick={ () => setCounter(counter+1)}>ClickMe</button>
    </div>
  );

}

ReactDOM.render(  
  <MyComponentWithHook /> ,
document.getElementById('root')
);