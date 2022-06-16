const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { time } = require("console");

const fileRoutes = require("./routes/fileRoutes.js")

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;




app.get("/", (req, res) => {
    res.send("Welcome to create file api🎉");
  });

app.use("/files", fileRoutes)

app.listen(PORT, () => console.log(`Server running on : ${PORT}`));
