class Sprite {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}


class Life extends Sprite {
  constructor(x,y){
    super(x,y)
    this.sprite = 'images/heart.png';
  }
  render(){
    super.render()
  }
}

class GameOver extends Sprite {
  constructor(x, y){
    super(x, y)
    this.sprite = 'images/download.png';
  }
  render(){
    super.render()
  }
}



class Enemy extends Sprite{
    constructor(x, y, speed = 15) {
      super(x,y)
        this.sprite = 'images/enemy-bug.png'
        this.speed = speed;
    }

    update(dt) {
        if (this.x > 500) {
            this.x = 0;
            this.move(dt)
        } else {
            this.move(dt)
        }
        this.playerPosition(player, 15)
    }

    resetPlayerPosition(player) {
        player.x = 200;
        player.y = 400;
        allLives.pop();
    }

    isSameAxisY(player) {
        return player.y === this.y
    }

    playerPosition(player, spaceBetweenEnemyAndPlayer) {
        if (Math.abs(player.x - this.x) < spaceBetweenEnemyAndPlayer && this.isSameAxisY(player)) {
            this.resetPlayerPosition(player)
        }
    }

    move(dt) {
        this.x += Math.floor(this.speed * dt);
    }

    render() {
      super.render()
    }

}

class Player extends Sprite{
    constructor(x,y) {
        super(x,y)
        this.sprite = 'images/char-boy.png'
        this.points = 0;
    }

    //update the location of player
    update(dt) {
        this.x * dt;
        this.y * dt;
    }
    //change location accordingly - stop when you access outside the grid
    move(x, y) {
        if (x !== 0) {
            return this.moveVertically(x)
        } else {
            return this.moveHorizontally(y)
        }
    }

    outOfBoundsX(x) {
        return (this.x + x > 400 || this.x + x < 0)
    }

    outOfBoundsY(y) {
        return (this.y + y > 400 || this.y + y < -50)
    }

    moveVertically(x) {
        return this.outOfBoundsX(x)
            ? this.x
            : this.addDistanceX(x)
    }

    moveHorizontally(y) {
        return this.outOfBoundsY(y)
            ? this.y
            : this.addDistanceY(y)
    }

    addDistanceX(x) {
        return this.x += x;
    }

    addDistanceY(y) {
        return this.reachedTheRiver()
            ? this.resetThePosition()
            : this.y += y;
    }

    reachedTheRiver() {
        return this.y === 0;
    }

    resetThePosition() {
        this.points += 1;
        this.x = 200;
        this.y = 400;
    }

    //draw the location
    render() {
      super.render()
    }

    //change position on the grid based on a keystroke
    handleInput(input) {
        console.log("keystroke", input)
        switch (input) {
            case "left":
                return this.move(-50, 0);
                break;
            case "up":
                return this.move(0, -50);
                break;
            case "right":
                return this.move(50, 0);
                break;
            case "down":
                return this.move(0, 50);
                break;
        }
    }
}



// Now instantiate your objects.
enemy1 = new Enemy(0, 100, 200);
enemy2 = new Enemy(0, 150, 100);
enemy3 = new Enemy(0, 200, 200);
enemy4 = new Enemy(0, 100, 90);
enemy5 = new Enemy(0, 150, 150);

let allEnemies = [];
allEnemies.push(enemy1)
allEnemies.push(enemy2)
allEnemies.push(enemy3)
allEnemies.push(enemy4)
player = new Player(200,400);

// build a life bar
lifeBar1 = new Life(0,50)
lifeBar2 = new Life(30,50)
lifeBar3 = new Life(60,50)

let allLives = [];
allLives.push(lifeBar1)
allLives.push(lifeBar2)
allLives.push(lifeBar3)

gameOver = new GameOver(80,200);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // console.log("position x", player.x)
    // console.log("position y", player.y)
    player.handleInput(allowedKeys[e.keyCode]);

});
