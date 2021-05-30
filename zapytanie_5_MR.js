
var mapFunction5 = function() {
	for (var i in this.credit){
		emit(this.credit[i].currency, Number(this.credit[i].balance));
	}
};


// TODO dodaj funkcje finialize dla avg. Ten sam model danych w map i reduce
var reduceFunction5 = function(currency, values) {
	
	var sumBalance = Array.sum(values);
	var avgBalance = sumBalance / values.length;
	
	var reducedValue = {
		sumOfBalance: sumBalance,
		avgOfBalance: avgBalance
	}
	
   return reducedValue;
};


printjson(db.people.mapReduce(
   mapFunction5,
   reduceFunction5,
   {
   	out: "map_reduce_output_5",
	query: { sex: "Female", nationality: "Poland"}
   }
))

printjson(db.map_reduce_output_5.find({}).toArray())