import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//currency convertor --> shared state

function CurrencyMessage(props){
  if(props.rupees >= 1000){
    return <p>This is too much money.</p>
  }
  return <p>No This is not too much money.</p>
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {currency:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({currency: event.target.value});
  }

  render(){
    const currency = this.state.currency;

    return(
      <fieldset>
        <legend>Enter Your Currency: </legend>
        <input value={currency} onChange={this.handleChange}></input>
        <CurrencyMessage rupees={currency}/>
      </fieldset>
    );
  }
}

ReactDOM.render(  
  <Calculator /> ,
document.getElementById('root')
);