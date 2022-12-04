const express = require('express');
const mongooseConnect = require('mongoose');
const mongodb = require('mongodb');
mongooseConnect.connect("mongodb://localhost:27017/Mongo_Class", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => {
    //console.log(`Successfully connected.`);
}).catch((error) => {
    console.log(`Failed to connect database..!! `, error);
});
const classsSchema = new mongooseConnect.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Date.now() },
    updated_at: { type: Date, required: false, default: null },
});
const ClassModel = mongooseConnect.model('classses', classsSchema);
/////////////////////////////////////////////////////////////////

async function Insert() {
    try {
        const NewData = new ClassModel({
            name: "vidyut3",
            phone: "1234567893",
            email: "vidyut3.start006@gmail.com",
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
                name: "vidyut4", phone: "1234567894", email: "vidyut4.start006@gmail.com", active: true,
            },
            {
                name: "vidyut5", phone: "1234567895", email: "vidyut5.start006@gmail.com", active: true,
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
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
//ReadData();






// const port = 5000;
// const app = express();

// app.get('/', (req, resp) => {
//     resp.json({ 'message': "It's wotking" });
// });

// app.listen(port);