require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes');
const errorHandling = require('./middleware/errorHadlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandling);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`);
     })
    }
    catch(e){
     console.log(e);
    }
}

start();