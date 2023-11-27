//node js for local host
const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8000;

const server = http.createServer(function (req, res) {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  const contentType = getContentType(filePath);

  fs.readFile(filePath, function (error, data) {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("Error: File Not Found");
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    default:
      return "application/octet-stream";
  }
}
