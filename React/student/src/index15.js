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

const unitName = {
  r:'rupees',
  d:'dollar'
};

class CurrencyInput extends React.Component{
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
    const unit = this.props.unit;

    return(
      <fieldset>
        <legend>Enter Your Currency in {unitName[unit]}: </legend>
        <input value={currency} onChange={this.handleChange}></input>
        <CurrencyMessage rupees={currency}/>
      </fieldset>
    );
  }
}

class Calculator extends React.Component{

  render(){
    return(
      <div>
        <CurrencyInput unit='r'/>
        <CurrencyInput unit='d'/>
      </div>
    );
  }
}

ReactDOM.render(  
  <Calculator /> ,
document.getElementById('root')
);