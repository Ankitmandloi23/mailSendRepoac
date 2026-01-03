const express = require('express');
const cors = require('cors');
const routes = require("./routes/index");
const app = express();
const http = require('http');
const PORT = 8080;
const server = http.createServer(app);
const env = require("dotenv");
env.config();
app.use(cors());
app.use(express.json());



app.use("/api", routes);

const startServer = async () => {
    try {

        server.listen(PORT, () => {
            console.log(` ✅ Server is ready to listen on port ${PORT}`);
        });

    } catch (err) {
        console.error(`❌Someting Went Wrong in Start Server, Error is  ${err}`);
        process.exit(1);
    }
}

startServer();