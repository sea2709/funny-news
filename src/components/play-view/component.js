export default class GameComponent {
  constructor(width, height, x, y, type, gameArea) {
    this.myGameArea = gameArea;
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
  }

  update(frameNo = 0) {
    let ctx = this.myGameArea.context;

    switch (this.type) {
      case 'bird':
        let birdImg = new Image();
        const idx = Math.ceil(frameNo / 3) % 4;
        birdImg.src = "bird" + idx + ".png";
        ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
        
        break;

      case 'block':
        let brickImg = new Image();
        brickImg.src = "crate.png";
    
        let x = this.x;
        let y = this.y;
        const w = 32;
        const h = 32;
        for (let i = 0; i < Math.ceil(this.height / 32); i++) {
          for (let j = 0; j < Math.ceil(this.width / 32); j++) {
            ctx.drawImage(brickImg, x, y, w, h);
            x += w;
          }
          y += h;
          x = this.x;
        }
        
        break;

      default:
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  newPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;

    this.y += this.speedY + this.gravitySpeed;
    if (this.y < 0) {
      this.y = 0;
    }

    this.hitBottom();
  }

  hitBottom() {
    let rockbottom = this.myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
        this.y = rockbottom;
        this.gravitySpeed = 0;
    }
  }

  crashWith(otherobj) {
    const myleft = this.x;
    const myright = this.x + (this.width);
    const mytop = this.y;
    const mybottom = this.y + (this.height);
    const otherleft = otherobj.x;
    const otherright = otherobj.x + (otherobj.width);
    const othertop = otherobj.y;
    const otherbottom = otherobj.y + (otherobj.height);
    let crash = true;
    
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }

    return crash;
  }
}