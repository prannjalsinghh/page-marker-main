const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
require('dotenv').config();
require('./src/db');
const userRouter = require('./src/routers/userRoutes');
const boardRouter = require('./src/routers/boardRoutes');


app.use(cors());
app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/boards', boardRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});