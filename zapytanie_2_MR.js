
var mapFunction2 = function() {
	for (var i in this.credit){
		emit(this.credit[i].currency, parseFloat(this.credit[i].balance));
   }
};


var reduceFunction2 = function(currency, values) {
   return Array.sum(values);
};

printjson(db.people.mapReduce(
   mapFunction2,
   reduceFunction2,
   { out: "map_reduce_output_2" }
))

printjson(db.map_reduce_output_2.find({}).toArray())

