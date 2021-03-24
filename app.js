const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const AccRoute = require("./src/routes/AccRoute");
const SocialRouter = require("./src/routes/SocialRoute");

const app = express();
const port = process.env.PORT || 8080;
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
]);
app.use(express.static("public"));
app.use([AccRoute, SocialRouter]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
