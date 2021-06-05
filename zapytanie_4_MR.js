
var mapFunction4 = function() {

	const weight = parseFloat(this.weight);
	const height = parseFloat(this.height) * 0.01;

	const bmi = (weight / ( height * height));

	const value = {
		count: 1,
		sumBMI: bmi,
		minBMI: bmi,
		maxBMI: bmi
	}
	emit(this.nationality, value);
};


var reduceFunction4 = function(nationality, values) {

	var reducedValues = {
		count: values[0].count,
		sumBMI: values[0].sumBMI,
		minBMI: values[0].minBMI,
		maxBMI: values[0].maxBMI
	}

	for (var idx = 0; idx < values.length; idx++){

		reducedValues.count = reducedValues.count + values[idx].count;
		reducedValues.sumBMI = reducedValues.sumBMI + values[idx].sumBMI;

		if (reducedValues.minBMI >  values[idx].minBMI){
			reducedValues.minBMI = values[idx].minBMI;
		}

		if (reducedValues.maxBMI <  values[idx].maxBMI){
			reducedValues.maxBMI = values[idx].maxBMI;
		}
	}

   	return reducedValues;
};


var finalizeFunction4 = function(nationality, reducedValues) {

	var avgBMI = reducedValues.sumBMI / reducedValues.count;

	var finalizedValues = {
		count: reducedValues.count,
		minBMI: reducedValues.minBMI,
		avgBMI: avgBMI,
		maxBMI: reducedValues.maxBMI
	}

	return finalizedValues;
};


printjson(db.people.mapReduce(
   mapFunction4,
   reduceFunction4,
   {
   	out: "map_reduce_output_45",
	finalize: finalizeFunction4}
))

printjson(db.map_reduce_output_45.find({}).toArray())
