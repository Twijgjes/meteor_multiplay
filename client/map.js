Template.map.helpers({
	rows : function() {
		var map = Map.findOne('42');
		if (!map) return [];
		return map.rows.map( function(row, index) {
			return {
				row: row.map(function(tile, index) {
					return { tile: tile, index: index };
				}),
				index: index
			};
		});
	}
});

Template.map.events({
	'click .tile' : function(e) {
		var y = e.currentTarget.getAttribute('data-y');
		var x = e.currentTarget.getAttribute('data-x');

		console.log('click', x, y);
		var map = Map.findOne('42');

		var oldValue = map.rows[y][x];

		if (oldValue == 'floor')
			var newValue = 'wall';
		else
			var newValue = 'floor';

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
      var moveYX = [0,0];
      if (e.which == 38)
        moveYX[0] = -1;
      if (e.which == 40)
        moveYX[0] = 1;
      if (e.which == 37)
        moveYX[1] = -1;
      if (e.which == 39)
        moveYX[1] = 1;

      if (moveYX[0] == 0 && moveYX[1] == 0)
        return;

//      var playerId = '';
//      var player = map.findOne(playerId);
//      var newPos = player.profile.position;
//      newPos.y += moveYX[0];
//      newPos.x += moveYX[1];
//      Map.update(playerId, {
//        $set : {
//          profile : {
//            position : newPos
//          }
//        }
//      })

    } );
  };
