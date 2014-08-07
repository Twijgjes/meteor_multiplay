Template.map.helpers({
	rows : function() {
		var map = Map.findOne('GsPYMGi5kpxAPZTpg');
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
		var map = Map.findOne('GsPYMGi5kpxAPZTpg');

		var oldValue = map.rows[y][x];

		if (oldValue == 'floor')
			var newValue = 'wall';
		else
			var newValue = 'floor';

		map.rows[y][x]  = newValue;

		Map.update('GsPYMGi5kpxAPZTpg', {
			$set : {
				rows : map.rows
			}
		});
	}
});