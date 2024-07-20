/**
 * @name Server Configuration
 */

const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const i18n = require('i18n');
const morgan = require('morgan');
const helmet = require('helmet');
const moment = require('moment');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();


connectDb();

// Configure i18n for multilingual
i18n.configure({
    locales: ['en'],
    directory: `${__dirname}/locales`,
    extension: '.json',
    prefix: ''
});

app.use(compression());
app.use(helmet());
app.use(i18n.init);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

app.use(morgan('dev'));

// Landing Page
app.get('/', (req, res) => {
    res.send({
        status: 'success',
        date: moment()
    });
});
app.use('/auth', authRoutes);

module.exports = app;