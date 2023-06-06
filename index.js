const express = require("express");
//import FileUpload from "express-fileupload";
const cors = require("cors");

const UsersRoute = require("./routes/UsersRoute.js");

// Server Initialization
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//app.use(FileUpload());
//app.use(express.static("public"));

// Routes will be written here
app.use("/users", UsersRoute);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
