import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//class based components in React
//props in class based components

class App extends React.Component{

  constructor(props){
    super(props);    
  }

  render(){
    return <h1>Hello {this.props.name}</h1>;
  }
}

ReactDOM.render(  
  <App name="Rajesh"/> ,
document.getElementById('root')
);