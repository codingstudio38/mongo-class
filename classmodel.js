const mongooseConnect = require('./dbconnect');
const validator = require('validator');
const classsSchema = new mongooseConnect.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true, minlength: [10, "minimum 10 digit."], maxlength: [10, "maximum 10 digit."] },
    email: {
        type: String, required: true, unique: true, trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid');
            }
        }
    },
    age: {
        type: Number, required: true, trim: true,
        validate(value) {
            if (value < 18) {
                throw new Error('minimum age is 18');
            }
        }
        // validate: {
        //     validator: function (value) {
        //         return value.length < 18
        //     },
        //     message: "minimum age is 18"
        // }
    },
    active: { type: Boolean, required: true, default: true },
    social_acc: { type: [], required: false },
    created_at: { type: Date, required: true, default: Date.now() },
    updated_at: { type: Date, required: false, default: null },
});
module.exports = mongooseConnect.model('classses', classsSchema);