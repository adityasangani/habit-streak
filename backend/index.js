const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const rootRouter = require("./routes/index.js");

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("server is running");
});
