const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const videos = fs.readFileSync("./data/videos.json");
const parsedVideos = JSON.parse(videos);
const app = express();
app.use(express.static("./public"));
router.get("/", (_req, res) => {
  res.json(parsedVideos);
});

router.get("/:id", (req, res) => {
  const foundVideo = parsedVideos.find((video) => video.id === req.params.id);
  res.json(foundVideo);
});

router.use(express.json());

router.post("/", (req, res) => {
  const { title, description, image } = req.body; 

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "You must provide a title" });
  }

  const newVideo = {
    id: uuidv4(),
    title: title,
    description: description,
    image: image,
    views: "0",
    likes: "0",
    channel: "Channel Name",
    duration: "6:00",
    timestamp: new Date().getTime(),  
    comments: [],
  };

  const videos = fs.readFileSync("./data/videos.json");
  const parsedVideos = JSON.parse(videos);
  parsedVideos.push(newVideo);

  const updatedVideos = JSON.stringify(parsedVideos);
  fs.writeFileSync("./data/videos.json", updatedVideos);

  res.status(201).json(newVideo);
});

module.exports = router;