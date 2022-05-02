const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://sanjib:sanjib1234@cluster0.c2aub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));




module.export = db;