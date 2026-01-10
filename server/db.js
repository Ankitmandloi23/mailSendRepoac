const mongoose = require('mongoose');


exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log("db connected"), (err) => console.log("error", err.message));

    } catch (err) {
        console.log("error wihle connection to the db", err.message);
    }
}

