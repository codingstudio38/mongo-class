const mongooseConnect = require('mongoose');
mongooseConnect.connect("mongodb://localhost:27017/Mongo_Class", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => {
    //console.log(`Successfully connected.`);
}).catch((error) => {
    console.log(`Failed to connect database..!! `, error);
});
module.exports = mongooseConnect;