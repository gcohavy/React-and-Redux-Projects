const projectName = "pomodoro-clock";

//Actual rendered app
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      title: "Session",
      breakLength: 300,
      sessionLength: 1500,
      active: false
    };
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.timer = this.timer.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.reset = this.reset.bind(this);
  }

  convert(i) {
    let minutes = Math.floor(i / 60);
    let seconds = i - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  handleUp(e) {
    if (!this.state.active) {
      e.target.id == "break-increment"
        ? this.setState({
            breakLength:
              this.state.breakLength <= 3540
                ? this.state.breakLength + 60
                : 3600
          })
        : this.setState({
            sessionLength:
              this.state.sessionLength <= 3540
                ? this.state.sessionLength + 60
                : 3600,
            time:
              this.state.sessionLength <= 3540
                ? this.state.sessionLength + 60
                : 3600,
            title: 'Session'
          });
    }
  }

  handleDown(e) {
    if (!this.state.active) {
      e.target.id == "break-decrement"
        ? this.setState({
            breakLength:
              this.state.breakLength > 60 ? this.state.breakLength - 60 : 60
          })
        : this.state.sessionLength > 60
          ? this.setState({
              sessionLength: this.state.sessionLength - 60,
              time: this.state.sessionLength - 60,
              title: 'Session'
            })
          : this.setState({
              sessionLength: 60,
              time: 60
            });
    }
  }

  timer() {
    this.setState({
      active: !this.state.active
    });
    !this.state.active
      ? (this.timerID = accurateInterval(() => this.decrementTime(), 1000))
      : this.timerID.cancel();
  }
  decrementTime() {
    if (this.state.time !== 0) {
      this.setState({ time: this.state.time - 1 });
    } else if (this.state.title == "Session") {
      this.setState({
        time: this.state.breakLength,
        title: "Break"
      });
      this.audioBeep.play();
    } else {
      this.setState({
        title: "Session",
        time: this.state.sessionLength
      });
      this.audioBeep.play();
    }
  }

  reset() {
    this.setState({
      time: 1500,
      title: "Session",
      breakLength: 300,
      sessionLength: 1500,
      active: false
    });
    this.timerID.cancel();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return (
      <div>
        <h1>Pomodoro Clock </h1>
        <div id="container">
          <Labels
            break={this.state.breakLength / 60}
            session={this.state.sessionLength / 60}
            increase={this.handleUp}
            decrease={this.handleDown}
          />
          <Starter start={this.timer} reset={this.reset} />
          <Timer
            time={this.convert(this.state.time)}
            title={this.state.title}
          />
        </div>
        <p>Created by Gabriel Cohavy</p>
        <audio
          id="beep"
          preload="auto"
          src="https://goo.gl/65cBl1"
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

//Top part with the time selections
class Labels extends React.Component {
  render() {
    return (
      <div id="labels">
        <div id="break-label">
          Break Length <br /> <hr />
          <button onClick={this.props.increase}>
            <i id="break-increment" className="fa fa-arrow-up fa-2x" />
          </button>
          <div id="break-length" className="time-set">
            {this.props.break}
          </div>
          <button onClick={this.props.decrease}>
            <i id="break-decrement" className="fa fa-arrow-down fa-2x" />
          </button>
        </div>
        <div id="session-label">
          Session Length <br /> <hr />
          <button onClick={this.props.increase}>
            <i id="session-increment" className="fa fa-arrow-up fa-2x" />
          </button>
          <div id="session-length" className="time-set">
            {this.props.session}
          </div>
          <button onClick={this.props.decrease}>
            <i id="session-decrement" className="fa fa-arrow-down fa-2x" />
          </button>
        </div>
      </div>
    );
  }
}

//Start stop and reset buttons
class Starter extends React.Component {
  render() {
    return (
      <div id="start_stop">
        <button onClick={this.props.start}>
          <i className="fa fa-play fa-2x" />
          <i className="fa fa-pause fa-2x" />
        </button>
        <button id="reset" onClick={this.props.reset}>
          <i className="fa fa-refresh fa-2x" />
        </button>
      </div>
    );
  }
}

//Clock to be rendered
class Timer extends React.Component {
  render() {
    return (
      <div id="timer-container">
        <div id="timer-label">{this.props.title}</div> <br />
        <div id="time-left">{this.props.time}</div>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById(projectName));
