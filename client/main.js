Meteor.startup(function() {
	console.log('*** starting Meteor Multiplay client ***');

	clientUpdateLoop(); // kick-off update loop on the client
})

// gobal var
moveYX = [0,0];
clientUpdateInterval = 500;

function clientUpdateLoop() {
	Meteor.setTimeout(clientUpdateLoop, clientUpdateInterval);
	document.title = new Date().getTime(); // indicates the loop is working or not

	clientUpdate();
}

function clientUpdate() {
	// 1. read player input
	

	// 2. perform player actions
	var user = Meteor.user()
	if (!user)
		return;

	var pos = user.profile.position;
	if (!pos) {
		pos = [0,0];
	}
	else {
		pos[0] = pos[0] + moveYX[0];
		pos[1] = pos[1] + moveYX[1];
		// pos = [0,0];
	}

	Meteor.users.update(user._id, {
		$set: {
			'profile.position' : pos
		}
	});
}