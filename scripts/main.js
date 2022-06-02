const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 600;
canvas.width = 800;


/*Goals before Recurse interview:
- enemies that move back and forth
    - two different types, plus UFO 
- barriers that break down (?)
*/

/*
THINGS I NEED TO KNOW HOW TO DO --

how to have things happen at a random time interval?

*/

/* make a class Invasion
    has x, y, dx, and dy attributes
    has a detectCollision function so it bounces back and forth
    when detectCollision goes, it speeds up and goes the opposite direction.
    the whole invasion can shoot from columns (y coordinates)
    this is where the array of Aliens can go - checks whether a column of aliens has any alien with status :1. If it does, it can shoot from there
    can checkWin & Win if the x coordinate is high enough (check this every time it speeds up)
    has a hit() method that the bullet class can access. If it is hit at a specific location, that alien's status becomes 0.
*/
class Alien {
    constructor (x, y, spriteUrl) {
        this.x = x;
        this.y = y;
        this.spriteUrl = spriteUrl;
        this.status = 1;
    }
    draw () {
        let image = new Image()
        image.src = this.spriteUrl
        image.onload = () => {
            ctx.drawImage(image, this.x, this.y);
        }
    }
    die () {
        this.status = 0;
    }
    shoot () {
        // make a class bullet, that can hit the player.
    }
}

class Invasion {
    constructor (totalRows, totalColumns) {
        this.x = 130;
        this.y = 30;
        this.dx = 3;
        this.dy = 0;
        this.invadersArray = []
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
    }
    populateInvaders () {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // how to make sure they don't streak across the page?
        // only draw the invaders where status === 1
        for (let column = 0; column < this.totalColumns; column++) {
            this.invadersArray[column] = [];
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
                this.invadersArray[column][row] = new Alien (this.x + column * 50, this.y + row * 50, spriteUrl);
            }
        } 
        this.drawInvaders();
    }   
    drawInvaders () {
        for (let column = 0; column < this.totalColumns; column++) {
            for (let row = 0; row < this.totalRows; row++) {
                this.invadersArray[column][row].draw();
            }
        }
    } 
    move = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.populateInvaders();
        this.x += 1
        console.log(this.x)
        requestAnimationFrame(this.move)
        // need to repopulate the array constantly??
    }
}

const invasion = new Invasion(5, 11);

invasion.move();





/* make a class Alien 
    status changes to 0 when it's hit.
*/

class Player {
    constructor() {
        this.x = canvas.width / 2 - 25;
        this.y = canvas.height - 50;
        this.dx = 3;
        this.height = 40;
        this.width = 40;
        this.lives = 3;
        this.spriteUrl = 'icons/player_ship.png'
    }
    draw () {
        let sprite = new Image()
        sprite.src = this.spriteUrl
        sprite.onload = () => {
            ctx.drawImage(sprite, this.x, this.y);
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
/* make a class player
has an x attribute, y attribute, dx, 
has a detectCollision function

DURING THE INTERVIEW - add the shoot() function. 
    Is it a constructor that makes a bullet? - which is a line.
    it has a status (0 or 1). Default status is 1, but if it successfully hits an alien, it is 0.
    Then the bullet has a checkHit method?
*/

/*
make a class gameLogic that can help keep score & stores high score to localStorage
 - gameLogic should also display the player's remaining lives
 - this is part of the interview
*/