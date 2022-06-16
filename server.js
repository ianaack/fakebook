// express setup
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose setup
const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/fakebook",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.set("debug", true);

// connect routes
app.use(require("./routes"));

// connect to server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
