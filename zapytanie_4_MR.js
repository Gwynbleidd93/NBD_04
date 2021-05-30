
var mapFunction4 = function() {

	const weight = parseFloat(this.weight);
	const height = parseFloat(this.height) * 0.01;

	const bmi = (weight / ( height * height));

	const value = {
		count: 1,
		bmi: bmi,
		minBMI: bmi,
		maxBMI: bmi
	}
	emit(this.nationality, value);
};


var reduceFunction4 = function(nationality, values) {

	const initValue = values[0].bmi

	var reducedValues = {
		count: 0,
		bmi: 0, // sum of BMI
		minBMI: initValue,
		maxBMI: initValue
	}

	for (var idx = 0; idx < values.length; idx++){

		reducedValues.count = reducedValues.count + values[idx].count;
		reducedValues.bmi = reducedValues.bmi + values[idx].bmi;

		if (reducedValues.minBMI >  values[idx].bmi){
			reducedValues.minBMI = values[idx].bmi;
		}

		if (reducedValues.maxBMI <  values[idx].bmi){
			reducedValues.maxBMI = values[idx].bmi;
		}
	}

   	return reducedValues;
};


var finalizeFunction4 = function(nationality, reducedValues) {

	var avgBMI = reducedValues.bmi / reducedValues.count;

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
   	out: "map_reduce_output_4",
	finalize: finalizeFunction4}
))

printjson(db.map_reduce_output_4.find({}).toArray())