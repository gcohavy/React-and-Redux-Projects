const projectName = 'drum-music';

const drumList = [
  {keyCode: 81,
  keyTrigger: 'Q',
  id: 'Test',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 87,
  keyTrigger: 'W',
  id: 'no',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 69,
  keyTrigger: 'E',
  id: 'something',
  url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 65,
  keyTrigger: 'A',
  id: 'this is unique',
  url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 83,
  keyTrigger: 'S',
  id: 'even more unique',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 68,
  keyTrigger: 'D',
  id: 'the uniqueness',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 90,
  keyTrigger: 'Z',
  id: 'wow how unique',
  url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 88,
  keyTrigger: 'X',
  id: 'uniquity',
  url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {keyCode: 67,
  keyTrigger: 'C',
  id: 'done',
  url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'}  
]

const activated = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
}
const inactive = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: "3px 3px 5px black"
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      padStyle: inactive
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(key) {
    if (key.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad(){
    if (this.props.power) {
      this.state.padStyle.backgroundColor === 'orange' ? this.setState({
        padStyle: inactive
      }) : this.setState({
        padStyle: activated
      });
    } else {
      this.state.padStyle.marginTop === 13 ? this.setState({
        padStyle: inactive
      }) : this.setState({
            height: 77,
            marginTop: 13,
            backgroundColor: 'grey',
            boxShadow: "0 3px grey"
      })
    };
  }
  playSound(option) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(()=> this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render(){
    return (
      <div id={this.props.clipId}
        onClick = {this.playSound}
        className = 'drum-pad'
        style = {this.state.padStyle}>
        <audio className = 'clip' id={this.props.keyTrigger} src = {this.props.clip} />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class DrumPads extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    let drumPads = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
    return (
      <DrumPad 
        clipId = {padBankArr[i].id}
        clip = {padBankArr[i].url}
        keyTrigger = {padBankArr[i].keyTrigger}
        keyCode = {padBankArr[i].keyCode}
        updateDisplay = {this.props.updateDisplay}
        />
    )})
    return (
    <div className = "drum-pads">
        {drumPads}
     </div>
    )
  }
}

class ActualApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      display: String.fromCharCode(160),
      currentPadBank: drumList,
      currentPadBankId: 'Heater Kit',
      volume: 0.3
    }
    this.display = this.display.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  display(name) {
    this.setState({
      display: name
    });
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render(){
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach( sound => sound.volume = this.state.volume);
    return (
      <div id='drum-machine'>
        <div id='left-side'  className = 'inner-container'>
          <h3 className='label'>Keys</h3>
          <DrumPads updateDisplay={this.display}
            clipVolume = {this.state.volume}
            currentPadBank={this.state.currentPadBank}/>
        </div>
        <div id='right-side' className = 'inner-container'>
          <h3 className='label'>Sound</h3>
          <p id = 'display'>{this.state.display}</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ActualApp />, document.getElementById(projectName));
