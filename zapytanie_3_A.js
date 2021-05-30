printjson(db.people.aggregate([
{
    $group:{
        _id: "$job",
		sum: { "$sum" : 1 }
    }
}]).toArray())
