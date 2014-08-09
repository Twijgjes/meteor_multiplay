Meteor.startup(function() {
	console.log('*** starting Meteor Multiplay client ***');

	clientUpdateLoop(); // kick-off update loop on the client
})

// gobal var
move = { x:0, y:0 };
clientUpdateInterval = 300;

function clientUpdateLoop() {
	Meteor.setTimeout(clientUpdateLoop, clientUpdateInterval);
	document.title = new Date().getTime(); // indicates the loop is working or not

	updatePlayer();
}

function updatePlayer() {
	var user = Meteor.user()
	if (!user)
		return;

	var pos = user.profile.position;
	if (!pos) {
		pos = { x:0, y:0 };
	}
	else {
		
		var map = Map.findOne('42');

		if (!map) return;

		

		var resultMove = { x: move.x, y: move.y };
		if (map.rows[pos.y][pos.x + move.x] == 'wall')
			resultMove.x = 0;
		if (map.rows[pos.y + move.y][pos.x] == 'wall')
			resultMove.y = 0;
		
		if (map.rows[pos.y + resultMove.y][pos.x + resultMove.x] == 'wall') return;

		pos.x += resultMove.x;
		pos.y += resultMove.y;
	}

	Meteor.users.update(user._id, {
		$set: {
			'profile.position' : pos
		}
	});
}