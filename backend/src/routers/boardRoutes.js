const boardRouter = require('express').Router();
const auth = require('../auth');
const { createBoard, getBoards, getBoardByURL, updateBoardByURL } = require('../controllers/boardController');

boardRouter.post('/createBoard', auth, createBoard);
boardRouter.get('/getAllBoards', auth, getBoards);
boardRouter.get('/:url', auth, getBoardByURL);
boardRouter.patch('/updateBoardByURL/:url', auth, updateBoardByURL);

module.exports = boardRouter;