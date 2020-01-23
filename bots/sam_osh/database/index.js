const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const config = require("../config");

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        dbName: config.DB_NAME
    }
);

mongoose.connection.on('error', err => {
    console.error(
        `Error occured during an attempt to establish connection with the database: %O`,
        err
    );
    process.exit(1);
});



module.exports = mongoose;