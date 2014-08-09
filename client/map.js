Template.map.helpers({
	rows : function() {
		var map = Map.findOne('42');
		if (!map) return []; // data not available on client yet
		return map.rows.map( function(row, index) {
			return {
				row: row.map(function(tile, index) {
					return { tile: tile, index: index };
				}),
				index: index
			};
		});
	},

	playerIsHere : function(x,y) {
		var user = Meteor.user();
		if (!user || !user.profile.position) return; // not logged in, or data not available on client yet
		
		// console.log('playerIsHere' ,x ,y);
		return x == user.profile.position.x &&
			y == user.profile.position.y;
	}
});

Template.map.events({
	'click .tile' : function(e) {
		var y = e.currentTarget.getAttribute('data-y');
		var x = e.currentTarget.getAttribute('data-x');

		// console.log('click', x, y);
		var map = Map.findOne('42');

		var oldValue = map.rows[y][x];

		if (oldValue == 'wall')
			var newValue = 'floor';
		else
			var newValue = 'wall';

		map.rows[y][x]  = newValue;

		Map.update('42', {
			$set : {
				rows : map.rows
			}
		});
	},

	'click [data-action=reset]' : function() {
		Meteor.users.update(Meteor.user()._id, {
			$set: {
				'profile.position' : { x:1 , y:1 }
			}
		});
	},

	'click [data-action=clear]' : function() {
		var map = Map.findOne('42');

		var rows = map.rows.map(function(row, y) {
			return row.map(function(tile, x) {
				if (x == 0 || y == 0 || x == 15 || y == 15)
					return 'wall';
				return 'floor';
			});
		});

		Map.update('42', {
			$set : { rows : rows }
		});
	}
});

Template.map.rendered =
  function(){
    $(window).on( 'keydown', function(e){
     e.preventDefault();
      if (e.which == 38)
        move.y = -1;
      if (e.which == 40)
        move.y = 1;
      if (e.which == 37)
        move.x = -1;
      if (e.which == 39)
        move.x = 1;
    } );

    $(window).on( 'keyup', function(e){
    e.preventDefault();
      if (e.which == 38)
        move.y = 0;
      if (e.which == 40)
        move.y = 0;
      if (e.which == 37)
        move.x = 0;
      if (e.which == 39)
        move.x = 0;
	});
  };
