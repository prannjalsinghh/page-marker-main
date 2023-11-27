const Board = require('../models/Board');
const User = require('../models/User');

const createBoard = async (req, res) => {
    const board = new Board({
        boardData: req.body.boardData,
        owner: req.user._id,
        webURL: req.body.webURL,
    });

    try{
        await board.save();
        req.user.boards = req.user.boards.concat(board._id);
        await req.user.save();
        res.status(201).send(board);
    }catch(err){
        res.status(400).send({message:"Could not create Board"});
        throw new Error(err);
    }

}

const getBoards = async (req, res) => {
    try{
        await req.user.populate('boards');
        res.send(req.user.boards);
    }catch(err){
        res.status(400).send({message:"Could not get Boards"});
        throw new Error(err);
    }
}

const getBoardByURL = async (req, res) => {
    const url = req.params.url;

    try{
        await req.user.populate('boards');
        const board = req.user.boards.find((board) => board.webURL === url);

        if(!board) {
            res.status(404).send({message:"Board not found"});
        }
        
        res.send(board);
    }catch(err){
        res.status(400).send({message:"Could not get Board"});
        throw new Error(err);
    }
}

const updateBoardByURL = async (req, res) => {
    const url = req.params.url;

    try{
        await req.user.populate('boards').execPopulate();
        const board = req.user.boards.find((board) => board.webURL === url);

        if(!board) {
            res.status(404).send({message:"Board not found"});
        }

        board.boardData = req.body.boardData;
        await board.save();

        res.send(board);
    }catch(err){
        res.status(400).send({message:"Could not update Board"});
        throw new Error(err);
    }
}

module.exports = { createBoard, getBoards, getBoardByURL, updateBoardByURL };

