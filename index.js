const express = require('express');
const mongodb = require('mongodb');
const ClassModel = require('./classmodel');

/////////////////////////////////////////////////////////////////

async function Insert() {
    try {
        const NewData = new ClassModel({
            name: "bidyut kumar mandal4",
            phone: 1234563892,
            email: "bidyut41.mandal@gmail.com",
            age: 18,
            active: true,
        });
        NewData.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//Insert();

async function InsertMany() {
    try {
        const data = [
            {
                name: "ayu", phone: "1234562212", email: "ayu.start006@gmail.com", active: true, age: 7
            },
            {
                name: "tunku", phone: "1234511821", email: "tunku.start006@gmail.com", active: true, age: 4
            }
        ];
        await ClassModel.insertMany(data).then((respons) => {
            console.log(respons);
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}
//InsertMany();


async function ReadData() {
    try {
        let data = await ClassModel.find();
        //let data = await ClassModel.find({ name: "vidyut3" }).select({ name: 1 }).limit(1);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//ReadData();


async function DataUpdate(id) {
    try {
        if (id.length < 24) {
            return console.log("failed..!! Invalid Id. id must be 24 characters.");
        }
        let total = await ClassModel.find({ _id: new mongodb.ObjectId(id) }).countDocuments();
        if (total <= 0) {
            return console.log("record not found..!!");
        }
        let result = await ClassModel.findByIdAndUpdate(
            { _id: new mongodb.ObjectId(id) },
            {
                $set: { name: "hello MongoDB", updated_at: Date.now() }
            },
            {
                new: true,
                useFindAndModify: false
            });
        // let result = await ClassModel.updateOne({ age: { $gte: 20 } }, { $set: { updated_at: Date.now() } });
        // let result = await ClassModel.updateMany({ active: { $eq: false } }, {
        //     $set: {
        //         updated_at: Date.now(),
        //         social_acc: [
        //             { "facebook": 1 },
        //             { "twitter": 0 },
        //             { "instagram": 0 }
        //         ]
        //     }
        // });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
//DataUpdate("63758ec7330a363220e29760");







async function DeleteUpdate(id) {
    try {
        if (id.length !== 24) {
            return console.log("failed..!! Invalid Id. id must be 24 characters.");
        }
        let total = await ClassModel.find({ _id: new mongodb.ObjectId(id) }).countDocuments();
        if (total == 0) {
            return console.log("record not found..!!");
        }

        let result = await ClassModel.findByIdAndDelete({ _id: new mongodb.ObjectId(id) });

        // let result = await ClassModel.deleteOne({ age: { $gte: 20 } });
        // let result = await ClassModel.deleteMany({ age: { $gte: 20 } });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
//DeleteUpdate("63758ef95eb690259425c3d2");








//Comparison Query Operators
async function Comparison() {
    try {
        //let data = await ClassModel.find({ age: { $eq: 20 } });
        //let data = await ClassModel.find({ age: { $gt: 20 } });
        //let data = await ClassModel.find({ age: { $gte: 20 } });
        //let data = await ClassModel.find({ age: { $lt: 20 } });
        //let data = await ClassModel.find({ age: { $lte: 20 } });
        //let data = await ClassModel.find({ name: { $ne: "vidyut" } });
        //let data = await ClassModel.find({ age: { $in: [18, 19] } });
        let data = await ClassModel.find({ age: { $nin: [18, 19, 20] } });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//Comparison();

//Logical Query Operators
//$expr -> expression operator
async function Logical() {
    try {
        //let data = await ClassModel.find({ $and: [{ email: "vidyut.start006@gmail.com" }, { name: "vidyut1" }] });
        //let data = await ClassModel.find({ age: { $not: { $gt: 20 } } });
        // let data = await ClassModel.find({ $nor: [{ age: 19 }, { age: 30 }] });
        let data = await ClassModel.find({ $or: [{ age: 20 }, { name: "vidyut1" }] });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//Logical()

// Sorting and Count Query

async function DataCountAndSorting() {
    try {
        //1= asc,-1=desc

        //let data = await ClassModel.find({ age: { $gte: 20 } }).countDocuments();

        //let data = await ClassModel.find().select({ name: 1, age: 1 }).sort({ age: -1 });

        //let date = new Date('2022-11-19T15:55:55.160+00:00');
        //let timeis = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
        // console.log(`${date.toDateString()} ${timeis}`);
        // console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${timeis}`);
        // date.toDateString() // "Thu Dec 29 2011"
        // date.toUTCString()  // "Fri, 30 Dec 2011 02:14:56 GMT"



        //LIKE OPERATER IN MONGODB
        //let data = await ClassModel.aggregate([{ $match: { 'name': { $regex: new RegExp(name), $options: "i" } } }, { $project: { _id: 1, name: 1 } }]);
        //let data = await ClassModel.find({ name: { $regex: new RegExp('mongoDB'), $options: "i" } });//{ $regex: /mongoDB/i }
        let data = await ClassModel.find({ name: { $in: [/mongodb/i, /mandal4/i] } });

        //let data = await ClassModel.find().limit(2);

        //let data = await ClassModel.find().skip(1).limit(1);//get second record

        //$elemMatch ---- find in array or object
        // let data = await ClassModel.find({ 'social_acc': { $elemMatch: { facebook: 0 } } });

        //Distinct
        //let data = await ClassModel.distinct('age', { active: true });
        console.log(data);
        // var allowlist = ['http://localhost:4200', 'http://example2.com'];
        // if (allowlist.indexOf("http://localhost:4200") == -1) {
        //     console.log(false);
        // } else {
        //     console.log(true);
        // }


    } catch (error) {
        console.log(error);
    }
}
//DataCountAndSorting();





//Aggregate in mongo
async function MongoAggregate() {
    try {
        // https://www.artofcse.com/learning/mongodb-aggregations
        // let data = await ClassModel.aggregate([{ $match: { active: false } }]);

        // for multiple group user -> {} like {"$active","$phone"}
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active" } }]);
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active", total: { $sum: "$age" } } }]);
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active", total: { $max: "$age" } } }]);
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active", total: { $min: "$age" } } }]);
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active", total: { $avg: "$age" } } }]);
        //let data = await ClassModel.aggregate([{ $group: { _id: "$active", total: { $first: "$age" } } }]);
        //let data = await ClassModel.aggregate([{ $group: { total: { $last: "$age" } } }]);

        // $project & $type Aggregate
        //let data = await ClassModel.aggregate([{ $match: { active: false } }, { $project: { fullname: "$name", emailid: "$email", age: 1, _id: 0 } }]);

        // let data = await ClassModel.aggregate([{ $match: { active: false } }, { $project: { fullname: "$name", email: 1, emailtype: { $type: '$email' }, agetype: { $type: '$age' }, age: 1, _id: 0 } }]);

        //$count Aggregate
        //let data = await ClassModel.aggregate([{ $match: { active: false } }, { $count: 'totals' }]);

        //$limit Aggregate
        //let data = await ClassModel.aggregate([{ $match: { active: true } }, { $project: { name: 1, email: 1 } }, { $limit: 5 }]);

        // $unwind Aggregate -> use for search data from array in database
        // let data = await ClassModel.aggregate([{ $match: { active: false } }, { $project: { name: 1, email: 1, social_acc: 1, age: 1 } }]);
        // { $match: { 'social_acc.twitter': 0 } }
        //let data = await ClassModel.aggregate([{ $unwind: '$social_acc' }, { $match: { active: false } }, { $project: { name: 1, email: 1, social_acc: 1, age: 1 } }]);
        //let data = await ClassModel.aggregate([{ $unwind: '$social_acc' }, { $group: { _id: '$social_acc' } }, { $match: { active: false } }]);


        //$match & $group
        let data = await ClassModel.aggregate([{ $match: { age: { $in: [18, 19, 20] } } }, { $group: { _id: '$age', total: { $sum: '$age' } } }, { $match: { total: 40 } }]);

        // $out Aggregate -> for create a new collection 
        //let data = await ClassModel.aggregate([{ $match: { age: { $in: [18, 19, 20] } } }, { $project: { _id:0,name: 1, email: 1, age: 1 } }, { $out: 'age_info' }]);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//MongoAggregate()


async function CollectionJoin() {
    try {
        let data = await ClassModel.aggregate([
            {
                $addFields: {
                    userid: {
                        $toObjectId: "$userid"
                    }
                }
            },
            {
                $lookup: {
                    from: "address",
                    localField: "_id",
                    foreignField: "userid",
                    as: "address_dtl"
                }
            },
            { $unwind: '$address_dtl' },
            {
                "$project": {
                    "_id": 1,
                    "name": 1,
                    "phone": 1,
                    "email": 1,
                    "age": 1,
                    "active": 1,
                    "social_acc": 1,
                    "address_dtl._id": 1,
                    "address_dtl.address": 1,
                    "address_dtl.district": 1,
                    "address_dtl.country": 1
                }
            }
            //,{ $match: { "address_dtl._id": new mongodb.ObjectId("637a4af1cb803f976f93db24") } }
        ]).exec();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//CollectionJoin();


async function modoperator() {
    //Then, the following query selects those documents in the inventory collection where value of the qty field modulo 10 equals 0:
    try {
        let data = await ClassModel.find({ age: { $mod: [10, 0] } });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
// modoperator();


async function textoperator() {
    //$text performs a text search on the content of the fields indexed with a text index. A $text expression has the following syntax:
    try {
        let data = await ClassModel.find({ $text: { $search: "mongo", $caseSensitive: false } });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//textoperator();






// const port = 5000;
// const app = express();

// app.get('/', (req, resp) => {
//     resp.json({ 'message': "It's wotking" });
// });

// app.listen(port);