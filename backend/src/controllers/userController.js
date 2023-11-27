const User = require('../models/User');
const Board = require('../models/Board');

const register = async (req, res) => {
    try{
        const user = new User(req.body);
        user.save();
        res.status(201).send(user);
    }catch(err) {
        res.status(400).send({message:"Could not Register"});
        throw new Error(err);
    }    
}

const login = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    }catch(err){
        res.status(400).send({message:"Could not Login"}); 
        throw new Error(err);
    }
}

const logout = async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });

        await req.user.save();

        res.send();
    }catch(err){
        res.status(400).send({message:"Could not Logout"});
    }
}

module.exports = { login, register, logout };