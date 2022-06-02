const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 600;
canvas.width = 600;

console.log("Hi!");

/*Goals before Recurse interview:
- enemies that move back and forth
    - two different types, plus UFO 
- player character controlled by arrow keys
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

/* make a class Alien 
    constructor takes a sprite URL, xlocation, ylocation
    same for all - width & height, status (1 default)
    status changes to 0 when it's hit.
*/

/* make a class player
has an x attribute, y attribute, dx, dy
has a detectCollision function

DURING THE INTERVIEW - add the shoot() function. 
    Is it a constructor that makes a bullet? - which is a line.
    it has a status (0 or 1). Default status is 1, but if it successfully hits an alien, it is 0.
    Then the bullet has a checkHit method?
*/

/*
make a class gameLogic that can help keep score & stores high score to localStorage
 - this is part of the interview
*/