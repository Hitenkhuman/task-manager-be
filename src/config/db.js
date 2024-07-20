const mongoose = require("mongoose");

const connectDb = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(console.log(`DB CONNECTED`))
        .catch((error) => {
            //ideally we should implement retrying logic here but due to time limit i am not implementing it
            console.log(`DB CONNECTION ISSUES`);
            console.log(error);
            process.exit(1);
        });
};

module.exports = connectDb;