import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import apiRouter from './api';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', apiRouter);

app.set('port', process.env.PORT || 8000);

export default app;
