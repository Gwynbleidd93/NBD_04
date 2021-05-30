printjson(db.people.aggregate([
{$unwind : "$credit"},
{ $match: { "sex": "Female" } },
{ $match: { "nationality": "Poland" } },
{
    $group:{
        _id: "$credit.currency",
        totalBalance: { $sum:  { $toDouble: "$credit.balance" }},
		avgBalance: { $avg:  { $toDouble: "$credit.balance" }} 
    }
}]).toArray())
