const projectName = 'calculator';

//This is the actual rendered app
class Calculator extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      value: '0',
      result: ''
    };
    this.handleNumber=this.handleNumber.bind(this);
    this.handleOperator= this.handleOperator.bind(this);
    this.handleDecimal=this.handleDecimal.bind(this);
    this.clear=this.clear.bind(this);
    this.evaluate=this.evaluate.bind(this);
  }

  handleNumber(e) {
    if(this.state.value == this.state.result ) {
      this.setState({
        value: e.target.value,
        result: ''
      })
    }
    else if (this.state.value.length<13) {
      this.setState({
        value: this.state.value == '0' ? e.target.value : this.state.value + e.target.value,
        result: ''
      });
    }
  }

  handleOperator(e) {
    let temp = this.state.result;
    if (temp) {
      this.setState({
        value: temp + e.target.value,
        result: ''
      })}
    else if(this.state.value.length<12) { !/[*/+-]/.test(this.state.value[this.state.value.length-1]) ?
      this.setState({
        value: this.state.value + e.target.value
      }) : 
      this.setState({
        value: this.state.value.slice(0 , -1) + e.target.value
    });
    };
  }
  
  handleDecimal(e) {
    var index;
    for(let i=0; i<this.state.value.length;i++){
      let temp = this.state.value[i];
      if( temp=='+' || temp=='-' || temp=='*' || temp=='/'){
         index = i;
         }
    }
    if(this.state.value.length<12) { 
      if (!/[.]/.test(this.state.value) || (this.state.value.lastIndexOf('.')<index)) {
      this.setState({
        value: this.state.value + '.'
      });
    }}
  }
  
  clear() {
    this.setState({
      value: '0',
      result: ''
    });
  }
  
  evaluate() {
    let answer = Math.round(10000000*eval(this.state.value)) / 10000000;
    this.setState({
      value: answer,
      result: answer
    });
  }
  
  render () {
    return (
    <div id='outer-box'>
        <Display 
          display={this.state.value}
          result={this.state.result}/>
        <Buttons 
          updateValue={this.handleNumber}
          addOperator={this.handleOperator}
          decimal={this.handleDecimal}
          evaluate={this.evaluate}
          clear={this.clear}/>
    </div>
  )};
}

//This is the calculator screen
class Display extends React.Component {
  render () {
    return (
      <div id='displayContainer'>
        <element id='display'>{this.props.display}</element>
      </div>
    )};
};

//These are the buttons on the Calculator
class Buttons extends React.Component {
    render () {
    return (
      <div id = 'buttons'>
        <button id='clear' value='0' onClick={this.props.clear}>A/C</button>
        <button id='divide' value='/' onClick={this.props.addOperator}>/</button>
        <button id='multiply' value='*' onClick={this.props.addOperator}>*</button>
        <button id='one' value='1' onClick={this.props.updateValue}>1</button>
        <button id='two' value='2' onClick={this.props.updateValue}>2</button>
        <button id='three'value='3' onClick={this.props.updateValue}>3</button>
        <button id='add' value='+' onClick={this.props.addOperator}>+</button>
        <button id='four' value='4' onClick={this.props.updateValue}>4</button>
        <button id='five' value='5' onClick={this.props.updateValue}>5</button>
        <button id='six' value='6' onClick={this.props.updateValue}>6</button>
        <button id='subtract' value='-' onClick={this.props.addOperator}>-</button>
        <button id='seven' value='7' onClick={this.props.updateValue}>7</button>
        <button id='eight' value='8' onClick={this.props.updateValue}>8</button>
        <button id='nine' value='9' onClick={this.props.updateValue}>9</button>
        <button id='equals' value='=' onClick={this.props.evaluate}>=</button>
        <button id='zero' value='0' onClick={this.props.updateValue}>0</button>
        <button id='decimal' value='.' onClick={this.props.decimal}>.</button>
      </div>
    )};
}

ReactDOM.render(<Calculator />, document.getElementById(projectName));
