import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//class based components in React
//working with handlers

class MySwitch extends React.Component{

  constructor(props){
    super(props);  
    this.state = {isOn : true};    
    this.myHandler = this.myHandler.bind(this);
  }

  myHandler(){
    //how do we change the state
    //this.state.isOn = false;
    this.setState( i => (
      {isOn: !i.isOn}
    ));
  }

  render(){
    const output = this.state.isOn;
    console.log(output);
    return (
      <div>
      <h1>This is result {output.toString()}</h1>
      <button onClick={this.myHandler}>{this.state.isOn ? 'ON':'OFF'}</button>
      </div>
    );
  }
}

ReactDOM.render(  
  <MySwitch /> ,
document.getElementById('root')
);