import React, {Component} from 'react'
import styles from './play-view.module.css'
import GameComponent from './component'


export default class PlayView extends Component {
  constructor(props) {
    super(props);

    this.myObstacles = [];
    this.gameObject = {
      canvas: document.createElement('canvas'),
    };

    this.state = {
      isStarted: false,
      isCrashed: false,
      frameNo: 0
    }
  }

  updateGameArea() {
    let x;

    for (let i = 0; i < this.myObstacles.length; i += 1) {
      if (this.gameObject.myGamePiece.crashWith(this.myObstacles[i])) {
        this.setState({
          isCrashed: true
        });

        return;
      } 
    }

    this.gameClear();
    this.setState({
      'frameNo': this.state.frameNo + 1
    });
    
    if (this.state.frameNo == 1 || this.everyinterval(150)) {
      x = this.gameObject.canvas.width;

      const minHeight = Math.ceil(this.gameObject.canvas.height / 3);
      const maxHeight = Math.ceil(this.gameObject.canvas.height * 0.5);
      const height1 = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      
      const minGap = 200;
      const maxGap = 500;
      const gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      const height2 = this.gameObject.canvas.height - height1 - gap;
      // (width, height, x, y, type, gameArea)
      this.myObstacles.push(new GameComponent(64, height1, x, 0, 'block', this.gameObject));
      this.myObstacles.push(new GameComponent(64, height2, x, this.gameObject.canvas.height - height2, 'block', this.gameObject));
    }

    for (let i = 0; i < this.myObstacles.length; i += 1) {
      this.myObstacles[i].x += -1;
      this.myObstacles[i].update(this.state.frameNo);
    }

    this.gameObject.myGamePiece.newPos();
    this.gameObject.myGamePiece.update(this.state.frameNo);
  }

  everyinterval(n) {
    if ((this.state.frameNo / n) % 1 == 0) {
      return true;
    }

    return false;
  }

  accelerate(n) {
    this.gameObject.myGamePiece.gravity = n;
  }

  gameStart() {
    this.interval = setInterval(() => {
      this.updateGameArea();
    }, 20);

    this.setState({
      isStarted: true
    });
  }

  gameRestart() {
    this.setState({
      isCrashed: false
    });

    clearInterval(this.interval);

    this.myObstacles = [];
    this.setState({'frameNo': 0});
    this.gameObject.myGamePiece.y = 120;
    this.interval = setInterval(() => {
      this.updateGameArea();
    }, 20);
  }

  gameClear() {
    this.gameObject.context.clearRect(0, 0, this.gameObject.canvas.width, this.gameObject.canvas.height);
  }

  initializeGame() {
    this.gameObject.myGamePiece = new GameComponent(34, 26, 10, 120, 'bird', this.gameObject);
    this.gameObject.myGamePiece.gravity = 0.05;
    this.gameObject.myScore = new GameComponent("30px", "Consolas", 280, 40, "text", this.gameObject);

    this.gameObject.canvas.width = window.outerWidth / 2;
    this.gameObject.canvas.height = document.getElementById('play-area').offsetHeight;
    this.gameObject.context = this.gameObject.canvas.getContext("2d");
  }

  componentDidMount() {
    this.initializeGame();

    document.getElementById('play-area').appendChild(this.gameObject.canvas);

    this.setState({'frameNo': 0});

    window.addEventListener("keydown", (event) => {
      if (this.state.isStarted && !this.state.isCrashed) {
        if (event.defaultPrevented) {
          return;
        }
      
        switch (event.key) {
          case " ": 
            this.accelerate(-0.25);
            break;
        }
      
        event.preventDefault();
      }
    }, true);

    window.addEventListener("keyup", (event) => {
      if (this.state.isStarted && !this.state.isCrashed) {
        if (event.defaultPrevented) {
          return;
        }
      
        switch (event.key) {
          case " ":
            this.accelerate(0.25);
            break;
        }
        event.preventDefault();
      }
    }, true);
  }
 
  render() {
    const isRunning = this.state.isStarted && !this.state.isCrashed;

    return (
      <div>
        <div id="play-area" className={`play-area ${isRunning ? "running": "paused"}`}></div>
        <div className="play-area-controls">
          {
            (this.state.isStarted && !this.state.isCrashed) ? 
            <button onMouseDown={() => {this.accelerate(-0.25)}} onMouseUp={() => {this.accelerate(0.25)}}>
              ACCELERATE
            </button> : ''
          }
          
          {
            !this.state.isStarted ? <button onClick={() => {this.gameStart()}}>START GAME</button> : ''
          }
          {
            this.state.isCrashed ? <button onClick={() => {this.gameRestart()}}>RESTART GAME</button> : ''
          }
          <div className="play-area-score">Score : {this.state.frameNo}</div>
        </div>
      </div>
    );
  }
}
