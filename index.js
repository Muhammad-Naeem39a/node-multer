// Imports
const express = require("express");
const multer = require("multer");

// CONSTs Declared
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.post("/upload", upload.single("Image"), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.file);
  res.json({ status: "Uploaded" });
});

// Server
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
