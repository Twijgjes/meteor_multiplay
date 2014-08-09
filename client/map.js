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
		return x == user.profile.position[1] &&
			y == user.profile.position[0];
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
	}
});

Template.map.rendered =
  function(){
    $(window).on( 'keydown', function(e){
     e.preventDefault();
      if (e.which == 38)
        moveYX[0] = -1;
      if (e.which == 40)
        moveYX[0] = 1;
      if (e.which == 37)
        moveYX[1] = -1;
      if (e.which == 39)
        moveYX[1] = 1;
    } );

    $(window).on( 'keyup', function(e){
    e.preventDefault();
      if (e.which == 38)
        moveYX[0] = 0;
      if (e.which == 40)
        moveYX[0] = 0;
      if (e.which == 37)
        moveYX[1] = 0;
      if (e.which == 39)
        moveYX[1] = 0;
	});
  };
