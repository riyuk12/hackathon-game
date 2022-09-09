# hackathon-game

try the game out here:
https://riyuk12.github.io/hackathon-game/

this is my first exposure to game dev in java so yeah any new suggestions are appreciated

the whole game is made in a canvas element in index.html file

the code is script.js

player 1 moves with asdw keys
player 2 moves with arrow keys

i have created the player instances from the sprite class 
  has two main methods 
  draw - this renders the frame
  update -updates all values to modified value
  (these two methods are common in almost all classes made)
  
the pillars are made via a pillar class which generates a single piller object

to create multiple pillars multiple instances of this is stored in an array

after every pillar reaches px 0 (left of screen)

it is removed from array

there are collision related values in all classes , and the collision logic simply returns boolean value
(i could have made it into a function/method but deadline was close, it is something i will fix in the future)

other than that its pretty basic logic every object has x,y position values and velocity values in x,y axis

every time update is called the respctive velocities add to position changing them
