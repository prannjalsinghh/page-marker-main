const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens:[{
        token: {
            type: String,
            required: true,
        }
    }],
    boards:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({
        _id: user._id.toString()

    },  process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

UserSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;