const express = require("express");
const session = require("express-session");
const multer = require("multer");
const cors = require("cors");
const { UserRoute } = require("./src/routes");
const { SocialRoute } = require("./src/routes");

global.__basedir = __dirname;

const app = express();
const upload = multer();
const port = process.env.PORT || 8080;
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use([
  express.json(),
  express.urlencoded({
    extended: true,
  }),
]);
app.use(upload.array());
app.use(express.static("public"));
app.use([UserRoute, SocialRoute]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
