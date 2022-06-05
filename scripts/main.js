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

const player1 = new Player
player1.draw();

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
        this.y = 30;
        this.dx = 1;
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

const invasion = new Invasion(5, 11);

const gameLogic = {
    bullet: undefined,
    play : () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                if (player1.lives <=0 ) {
                    player1.die()
                }
                bullet = undefined
            }
        }
        requestAnimationFrame(gameLogic.play)
    }
}

gameLogic.play();


