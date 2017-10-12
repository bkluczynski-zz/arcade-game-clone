//basic sprite
class Sprite {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
}
//available lives sprite
class Life extends Sprite {
    constructor(x, y) {
        super(x, y)
        this.sprite = 'images/heart.png';
    }
    render() {
        super.render()
    }
}
//gameover sprite
class GameOver extends Sprite {
    constructor(x, y) {
        super(x, y)
        this.sprite = 'images/download.png';
    }
    render() {
        super.render()
    }
}
//victory sprite
class Score extends Sprite {
    constructor(x, y) {
        super(x, y)
        this.sprite = 'images/cutmypic.png'
    }
    render() {
        super.render()
    }
}

class Enemy extends Sprite {
    constructor(x, y, speed = 15) {
        super(x, y)
        this.sprite = 'images/enemy-bug.png'
        this.speed = speed;
    }

    //getting random position on axis y (within grass boundaries) after leaving the screen
    getRandomPositionY(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    //update the location of the sprit
    update(dt) {
        if (this.x > 500) {
            this.x = 0;
            this.y = this.getRandomPositionY(30, 250)
            this.move(dt)
        } else {
            this.move(dt)
        }
        this.playerPosition(player, 30)
    }

    resetPlayerPosition(player) {
        player.x = 200;
        player.y = 400;
        allLives.pop();
    }
    //if enemy is close enough to the player
    isCloseAxisY(player, spaceBetweenEnemyAndPlayer) {
        return Math.abs(player.y - this.y) < spaceBetweenEnemyAndPlayer
    }
    //if enemy is close enough to the player
    isCloseAxisX(player, spaceBetweenEnemyAndPlayer) {
        return Math.abs(player.x - this.x) < spaceBetweenEnemyAndPlayer
    }
    //reset player's position
    playerPosition(player, spaceBetweenEnemyAndPlayer) {
        (this.isCloseAxisX(player, spaceBetweenEnemyAndPlayer) && this.isCloseAxisY(player, spaceBetweenEnemyAndPlayer))
            ? this.resetPlayerPosition(player)
            : null
    }

    //move the sprite
    move(dt) {
        this.x += Math.floor(this.speed * dt);
    }

    render() {
        super.render()
    }

}

class Player extends Sprite {
    constructor(x, y) {
        super(x, y)
        this.sprite = 'images/char-boy.png'
    }

    //update the location of player
    update() {
        this.x
        this.y
    }
    //change location accordingly - stop when you access outside the grid
    move(x, y) {
        return x !== 0
            ? this.moveVertically(x)
            : this.moveHorizontally(y)
    }
    //if it's out of bounds of the screen stop
    outOfBoundsX(x) {
        return (this.x + x > 400 || this.x + x < 0)
    }
    //if it's out of bounds of the screen stop
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
        allScores.push(victory)
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
enemy2 = new Enemy(0, 150, 250);
enemy3 = new Enemy(0, 200, 200);
enemy4 = new Enemy(0, 100, 120);
enemy5 = new Enemy(0, 150, 150);

let allEnemies = [];
allEnemies.push(enemy1)
allEnemies.push(enemy2)
allEnemies.push(enemy3)
allEnemies.push(enemy4)
allEnemies.push(enemy5)
player = new Player(200, 400);

// build a life bar
lifeBar1 = new Life(0, 50)
lifeBar2 = new Life(30, 50)
lifeBar3 = new Life(60, 50)
victory = new Score(120, 200)

let allLives = [];
let allScores = [];
allLives.push(lifeBar1)
allLives.push(lifeBar2)
allLives.push(lifeBar3)

gameOver = new GameOver(80, 200);

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
