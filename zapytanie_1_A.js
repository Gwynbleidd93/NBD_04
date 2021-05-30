printjson(db.people.aggregate(
{$group: 
{ _id: "$sex", 
"count": { "$sum": 1 },
"avgWeight": {"$avg" : { $toDouble: "$weight" } },
"avgHeight": {"$avg" : { $toDouble: "$height" } }
}}
).toArray())

