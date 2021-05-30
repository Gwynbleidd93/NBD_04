var mapFunction3 = function() {
		
   emit(this.job, 1);
};

var reduceFunction3 = function(jobs, values) {
	
   return Array.sum(values);
};


printjson(db.people.mapReduce(
   mapFunction3,
   reduceFunction3,
   { out: "map_reduce_output_3" }
))

printjson(db.map_reduce_output_3.find({}).toArray())
