import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Health");
});

app.post("/upload", async (req, res, next) => {
  console.log(req.body);

  res.send("Hello Hans!");
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
