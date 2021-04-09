// jshint esversion: 6

window.addEventListener("load",function() {
      
    //constants
    var GAME_WIDTH = 640;
    var GAME_HEIGHT = 320;

    //keep the game going
    var gameLive = true;

    //enemies
    var enemies = [
      {
        x: 100, //x coordinate
        y: 100, //y coordinate
        speedY: 2, //speed in Y
        w: 40, //width
        h: 40 //heght
      },
      {
        x: 200,
        y: 0,
        speedY: 2,
        w: 40,
        h: 40
      },
      {
        x: 330,
        y: 100,
        speedY: 3,
        w: 40,
        h: 40
      },
      {
        x: 450,
        y: 100,
        speedY: 5,
        w: 40,
        h: 40
      }
    ];

    //the player object
    var player = {
      x: 10,
      y: 160,
      speedX: 2.5,
      isMoving: 0,
      w: 40,
      h: 40
    };

    //the goal object
    var goal = {
      x: 580,
      y: 160,
      w: 50,
      h: 36
    };

    let sprites = {};

    const movePlayer = function() {
      player.isMoving = true;
    };

    const stopPlayer = function() {
      player.isMoving = false;
    };
    
    //grab the canvas and context
    const canvas = document.getElementById("mycanvas");
    const ctx = canvas.getContext("2d");

    //event listeners to move player
    canvas.addEventListener('mousedown', movePlayer);
    canvas.addEventListener('mouseup', stopPlayer);   
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);
    // Keyboard keypress event
    document.addEventListener("keypress", (event)=>{
      if(event.key == "d"){
        player.isMoving = true;
        setTimeout(() => {
          player.isMoving = false;
        }, 150);
      }
    }); 

    const load = function() {
      sprites.player = new Image();
      sprites.player.src = 'images/hero.png';

      sprites.background = new Image();
      sprites.background.src = 'images/floor.png';

      sprites.enemy = new Image();
      sprites.enemy.src = 'images/enemy.png';

      sprites.goal = new Image();
      sprites.goal.src = 'images/chest.png';
    };

    //update the logic
    const update = function() {

      // Check if user won the game
      if(checkCollision(player, goal)) {
        //stop the game
          gameLive = false;

          alert('You\'ve won!');

          //reload page
          window.location = "";
      }

      //update player
      if(player.isMoving) {
        player.x = player.x + player.speedX;
      }

      //update enemies
      var i = 0;
      var n = enemies.length;
      
      enemies.forEach(function(element, index){

        //check for collision with player
        if(checkCollision(player, element)) {
          //stop the game
          gameLive = false;

          
          // Game over

          //reload page
          window.location = "";
        }

        //move enemy
        element.y += element.speedY;
        
        //check borders
        if(element.y <= 10) {
          element.y = 10;
          //element.speedY = element.speedY * -1;
          element.speedY *= -1;
        }
        else if(element.y >= GAME_HEIGHT - 50) {
          element.y = GAME_HEIGHT - 50;
          element.speedY *= -1;
        }
      });
    };

    //show the game on the screen
    const draw = function() {
      //clear the canvas
      ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);        

      //draw background
      ctx.drawImage(sprites.background, 0, 0);

      //draw player
      ctx.drawImage(sprites.player, player.x, player.y);

      //draw enemies
      enemies.forEach(function(element, index){
        ctx.drawImage(sprites.enemy, element.x, element.y);
      });

      //draw goal
      ctx.drawImage(sprites.goal, goal.x, goal.y);
    };

    //gets executed multiple times per second
    const step = function() {
      update();
      draw();
      if(gameLive) {
        window.requestAnimationFrame(step); 
      }     
    };

    //check the collision between two rectangles
    const checkCollision = function(rect1, rect2) {
      let closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
      let closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
      return closeOnWidth && closeOnHeight;
    }

    //initial kick
    load();
    step();
  });