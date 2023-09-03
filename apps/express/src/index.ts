import express from "express";
import bodyParser from "body-parser";
import formidable from "formidable";
import { utapi } from "uploadthing/server";
import fs from "fs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Hans!");
});

app.post("/upload", async (req, res, next) => {
  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    try {
      const image = files.image![0];

      if (!image || !image.originalFilename) {
        return res.status(400).send("No image provided");
      }

      const imageBuffer = fs.readFileSync(image.filepath);

      res.status(200).send("Image uploaded");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
