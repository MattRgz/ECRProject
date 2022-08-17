const {Schema,model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true
        },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
},{timestamps:true});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
});

const User = model('User',UserSchema);

module.exports = User;