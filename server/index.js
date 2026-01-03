require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.SERVER_PORT || 8080;
const cors = require('cors');
const routes = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Routes
app.use("/api", routes);



const startServer = async () => {
  try {
    await dbConnection();
    server.listen(PORT, () => {
      console.log(` ✅ Server is ready to listen on port ${PORT}`);
    });

  } catch (err) {
    console.error(`❌Someting Went Wrong in Start Server, Error is  ${err}`);
    process.exit(1);
  }
}

startServer();