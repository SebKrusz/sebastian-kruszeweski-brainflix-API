const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(express.static("./public"));

app.use(cors());


const postVideos = require("./routes/videos");
app.use("/videos", postVideos);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
