// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//
//
// * Keypresses
// Speedometor
// Canvas 
// Fuel/Fuel Station
// Controller Integration Maybe
// Alternate Reality Game Integration beyond Fuel Station
// Time limit
// Dance Algorithm
// UI Improvements
// w

var zoom = 1; // If we get so far as to zoom out as we hit the edge of the screen.
var forward = 0;
var turn = 0;
var strafe = 0;
var interval=.5;
var max = 1;
var min = -1;
var connection = "http://127.0.0.1:8071/motion-control/update";
var color=000;
var x = 650;
var y = 300;
var toggle = true;

	// We will separate the following out after.  During refactoring Phase.
	// The plan is to refactor our code 30 minutes later. #####jam3.com
  function drawCraft() {
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      ctx.fillStyle="rgb("+color+","+color+","+color+")";
      ctx.fillRect(x,y,20/zoom,20/zoom);  
      y -= forward*10;
      x -= strafe*10;
      console.log("I made it through a loop!");

      if (toggle === true) {
      	color+=5;
      } else {
      	color-=5;
      }
      	
      if (color > 230) {
      	toggle = false;
      } else if (color === 0) {
      	toggle = true;
      }
  }

	function moveForward() {
		if (forward < max) {
			forward+=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
      drawCraft();
		} else {
			console.log('Maximum velocity achieved.');
		}
	}
	function turnRight() {
		if (turn < max) {
			turn+=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!');
		} 
	}
	function moveBackward() {
		if (forward > min) {
			forward-=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
		} else {
			console.log('Maximum Negative Velocity Achieved!');
		}
	}
	function turnLeft() {
		if (turn > min) {
			turn-=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!');
		}
	}
	function strafeLeft() {
		if (strafe < max) {
			strafe+=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!');
		}
	}
	function strafeRight() {
		if (strafe > min) {
			strafe-=interval;
			$.ajax({url: connection, data: {forward: forward, turn: turn, strafe: strafe}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!');
		}
	}
	function allStop() {
		turn=0;
		strafe=0;
		forward=0;
		$.ajax({url: connection, data: {forward: turn, turn: strafe, strafe: strafe}, dataType: "jsonp"});
	}



$(document).ready(function(){
	$(document).keydown(function(key){
		switch(parseInt(key.keyCode)){ // KEYS = a:65 s:83 d:68 w:87 q:81 e:69 space:32
			case 87:
				// move forward
				moveForward();
				break;
			case 68:
				// move right
				turnRight();
				break;
			case 83:
				// move down
				moveBackward();
				break;
			case 65:
				// move left
				turnLeft();
				break;
			case 81:
				// strafe left
				strafeLeft();
				break;
  		case 69:
				//strafe right
				strafeRight();
				break;
			case 32:
				//stop all
				allStop();
				break;
		} 
	});

    setInterval(drawCraft,1000); 
    console.log("I'm past the first drawCraft");
});































