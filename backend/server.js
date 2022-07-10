const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://amant988:amant98@cluster0.k3hjdif.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to Database"))
  .catch((er) => console.log(er));

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
