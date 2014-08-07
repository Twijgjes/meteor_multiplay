Template.map.helpers({
	rows : function() {
		var map = Map.findOne('GsPYMGi5kpxAPZTpg');
		if (!map) return [];
		return map.rows;
	}
});