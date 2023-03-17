const express = require("express");
const path = require("path");
const multer = require("multer");
const { merge } = require("./pdfMergeEngine");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use("/static", express.static("public"));
const port = process.env.PORT || 8080;

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  //   console.log(req.files);
  let merged = await merge(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path),
  );
  res.redirect(`http://localhost:8080/static/${merged}.pdf`);
  //   res.send({ data: req.files });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port);
console.log("Server started listening at http://localhost:" + port);
