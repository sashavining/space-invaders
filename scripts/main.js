const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 600;
canvas.width = 800;

class Player {
    constructor() {
        this.x = canvas.width / 2 - 25;
        this.y = canvas.height - 50;
        this.dx = 3;
        this.height = 40;
        this.width = 40;
        this.lives = 3;
        this.sprite = new Image()
        this.spriteLoaded = false;
        this.sprite.onload = () => this.spriteLoaded = true
        this.sprite.src = 'icons/player_ship.png'
    }
    draw () {
        if (this.spriteLoaded) {
            ctx.drawImage(this.sprite, this.x, this.y);
        }
    }
    hit () {
        this.lives --
        if (this.lives <= 0) {
            this.die();
        }
    }
    die () {
        console.log('literally DED')
    }
}


class Bullet {
    constructor (x, y, width, height, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; // doesn't do anything yet, but I can use it when the player is able to shoot.
        this.width = width;
        this.height = height;
    }
    draw () {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = '#ffffff';
        ctx.closePath();
        ctx.fill();
    } 
    move () { 
        this.draw();
        this.y += 5
    }
    checkForHit(target) { 
        if (this.y + length >= target.y && this.x < target.x + 50 && this.x > target.x) {
            return true 
        } else return false;
    }
    checkOverflowCanvas () {
        return (this.y >= canvas.height)
    }
}

class Alien {
    constructor (x, y, spriteUrl) {
        this.x = x;
        this.y = y;
        this.spriteUrl = spriteUrl;
        this.status = 1;
        this.sprite = new Image()
        this.spriteLoaded = false;
        this.sprite.onload = () => this.spriteLoaded = true
        this.sprite.src = this.spriteUrl
    }
    draw () {
        if (this.spriteLoaded) {
            ctx.drawImage(this.sprite, this.x, this.y);
        }
    }
    die () {
        this.status = 0;
    }
}

class Invasion {
    constructor (totalRows, totalColumns) {
        this.x = 130;
        this.y = 50;
        this.dx = .5;
        this.dy = 0;
        this.invadersArray = []
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        this.randomNum = 0;
    }
    populateInvaders () {
        for (let column = 0; column < this.totalColumns; column++) {
            if (!this.invadersArray[column]) {
                this.invadersArray[column] = [];
            }
            for (let row = 0; row < this.totalRows; row++) {
                let spriteUrl;
                switch (row) {
                    case 0:
                        spriteUrl = 'icons/alien_zero.png';
                        break;
                    case 1:
                        spriteUrl = 'icons/alien_one.png';
                        break;
                    case 2:
                        spriteUrl = 'icons/alien_one.png';
                        break;
                    default:
                        spriteUrl = 'icons/alien_two.png';
                        break;
                }
                if (!this.invadersArray[column][row]) {
                    this.invadersArray[column][row] = new Alien (this.x + column * 50, this.y + row * 50, spriteUrl);               
                }
                if (this.invadersArray[column][row].status === 1) {
                    this.invadersArray[column][row].x = this.x + column * 50
                    this.invadersArray[column][row].y = this.y + row * 50
                    this.invadersArray[column][row].draw();    
                }
            }
        } 

    }   
    move = () => {
        this.populateInvaders();
        this.x += this.dx
        if (this.x + (49 * this.totalColumns) >= canvas.width || this.x < 0) {
            this.dx *= -1
            this.y += 3
        }
    }
    shoot = () => {
        let lastRow = this.invadersArray.map(x => x[this.totalRows - 1])
        let shotX = lastRow[Math.floor(Math.random() * this.totalColumns)].x;
        let shotY = lastRow[0].y + 30;
        return new Bullet(shotX, shotY, 2, 10, 'down');
    }
}

const gameLogic = {
    bullet: undefined,
    gameActive: false,
    player1: undefined,
    invasion: undefined,
    startGame: () => {
        if (!gameLogic.gameActive) {
            console.log('starting game!')
            player1 = new Player
            player1.draw();
            invasion = new Invasion(5, 11);
            gameLogic.play();
            gameLogic.gameActive = true;
        }
    },
    play : () => {
        document.removeEventListener('keydown', gameLogic.startGame)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (player1.lives <= 0 ) {
            player1.die();
            gameLogic.loadDeathScreen();
            return;
        }
        invasion.move();
        if (!this.bullet) {
            if (Math.floor(Math.random()*75) > 73) {
                this.bullet = invasion.shoot();
           }
        }
        if (this.bullet) {
            this.bullet.move();
        }
        if (this.bullet && this.bullet.checkOverflowCanvas()) {
            bullet = undefined;
        }
        player1.draw();
        if (this.bullet) {
            if (this.bullet.checkForHit(player1)) {
                player1.lives--
                bullet = undefined
            }
        }
        requestAnimationFrame(gameLogic.play)
    },

    loadStartScreen: () => {
        ctx.fillStyle = 'white';       
        ctx.font = '30px Andale Mono';
        ctx.fillText('Press any key to start', canvas.width / 2 - 210, canvas.height / 2 - 20); 
        document.addEventListener('keydown', gameLogic.startGame)
    },
    loadPlayAgain: () => {
        ctx.fillStyle = 'white';       
        ctx.font = '30px Andale Mono';
        ctx.fillText('Play again?', canvas.width / 2 - 100, canvas.height / 2 + 30); 
        document.addEventListener('keydown', gameLogic.startGame)
    },
    loadDeathScreen: () => {
        gameLogic.gameActive = false;
        ctx.fillStyle = 'white';       
        ctx.font = '30px Andale Mono';
        ctx.fillText('Oops! You are dead!', canvas.width / 2 - 180, canvas.height / 2 - 20); 
        setTimeout(gameLogic.loadPlayAgain, 1500);
    }
}

gameLogic.loadStartScreen();


