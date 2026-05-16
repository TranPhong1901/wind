const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./api');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Wind standalone backend chạy tại http://localhost:${port}`);
});
