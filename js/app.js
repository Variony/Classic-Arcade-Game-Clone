// Enemies our player must avoid
'use strict';

let Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = - 101;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if(this.x >= 606) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 415;
    this.score = 0;
    this.hearts = 3;
};

Player.prototype.update= function() {
    if(this.y === 0) {
        this.x = 202;
        this.y = 415;
        this.score += 1000;
    }

};

Player.prototype.render= function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x >= 101){
                this.x -= 101;
            }
            break;
        case 'up':
            if(this.y >= 83) {
                this.y -= 83;
            }
            break;
        case 'right':
            if(this.x <= 303) {
                this.x += 101;
            }

            break;
        case 'down':
            if(this.y <= 332) {
                this.y += 83;
            }
            break;
    }

};


Player.prototype.checkCollision = function() {

    let collision = false;
    for(let enemy of allEnemies) {
        let cover =  this.x < enemy.x + 55 && this.x > enemy.x - 55;
        if(enemy.y === this.y && cover) {
            this.x = 202;
            this.y = 415;
            collision = true;
            allEnemies = [];
            createEnemies();
            -- this.hearts;
            if(this.hearts === 0) {
                alert("Game Over");
                this.hearts = 3;
                this.score = 0;
            }
            return;
        }
    }
};


let player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

function createEnemies() {
    let y = [83, 166, 249];
    for(let i = 0; i < 5; i ++) {
        let speed = 100 + Math.random() * 100;
        let position = Math.floor(Math.random() * y.length);
        allEnemies.push(new Enemy(y[position], speed));
    }
}

createEnemies();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
