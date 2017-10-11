// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

class Enemy {
    constructor(x = 0, y = 0, speed = 15) {
        this.sprite = 'images/enemy-bug.png'
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    }

    isSameAxisY(player) {
        return player.y === this.y
    }

    playerPosition(player, difference) {
        if (Math.abs(player.x - this.x) < difference && this.isSameAxisY(player)) {
            this.resetPlayerPosition(player)
        }
    }

    move(dt) {
        this.x += Math.floor(this.speed * dt);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }

}

class Player {
    constructor(x = 200, y = 400) {
        this.sprite = 'images/char-boy.png'
        this.x = x;
        this.y = y;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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
        this.x = 200;
        this.y = 400;
    }

    //draw the location
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
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
player = new Player();

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
