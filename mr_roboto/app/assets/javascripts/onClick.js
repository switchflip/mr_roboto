	$('.forward').on('click', function(){
		if (forward < max) {
			forward+=interval;
			$.ajax({url: "http://127.0.0.1:8071/motion-control/update", data: {forward: forward}, dataType: "jsonp"});
		} else {
			console.log('Maximum velocity achieved.');
		}
	});
	$('.right').on('click', function(){
		if (turn < max) {
			turn+=interval;
			$.ajax({url: "http://127.0.0.1:8071/motion-control/update", data: {turn: turn}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!')
		} 
	});
	$('.backward').on('click', function(){
		if (forward > min) {
			forward-=interval;
			$.ajax({url: "http://127.0.0.1:8071/motion-control/update", data: {forward: forward}, dataType: "jsonp"});
		} else {
			console.log('Maximum Negative Velocity Achieved!')
		}
	});
	$('.left').on('click', function(){
		if (turn > min) {
			turn-=interval;
			$.ajax({url: "http://127.0.0.1:8071/motion-control/update", data: {turn: turn}, dataType: "jsonp"});
		} else {
			console.log('Maximum Turn Achieved!')
		}
	});
	$('.stop').on('click', function(){
		turn=0;
		strafe=0;
		forward=0;
		$.ajax({url: "http://127.0.0.1:8071/motion-control/update", data: {forward: turn, turn: strafe, strafe: strafe}, dataType: "jsonp"});
	});