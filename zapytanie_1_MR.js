
// use finilize, use the same names of vars via map nad raduce and finalize
// w Reduce nigdy nie liczyc sredniej. Nalezy liczyc sume i count , a nastepnie przekazac to do policzenia sredniej w funkcji finalize.

var mapFunction1 = function() {
	
   var value = {
	   count: 1,
	   weight: parseFloat(this.weight),
	   height: parseFloat(this.height)
   }

   emit(this.sex, value);
};

var reduceFunction1 = function(sex, values) {

	var sumValues = {
		count: 0,
		weight: 0,
		height: 0
	}


	for (var idx = 0; idx < values.length; idx++){
		sumValues.count = sumValues.count + values[idx].count;

		sumValues.weight = sumValues.weight + values[idx].weight;
		sumValues.height = sumValues.height + values[idx].height;
	}

	var reducedValues = {
		count: sumValues.count,
		weight: sumValues.weight,
		height: sumValues.height
	}

   return reducedValues;
};

var finalizeFunction1 = function(sex, reducedValues) {

	var avgWeight = reducedValues.weight / reducedValues.count;

	var avgHeight = reducedValues.height / reducedValues.count;

	var finalizedValues = {
		count: reducedValues.count,
		avgWeight: avgWeight,
		avgHeight: avgHeight
	}

	return finalizedValues;
};



printjson(db.people.mapReduce(
   mapFunction1,
   reduceFunction1,
   {
   	out: "map_reduce_output_1",
	finalize: finalizeFunction1
   }
))

printjson(db.map_reduce_output_1.find({}).toArray())
