const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const { cors } = require("./middlewares/cors");
const { routes } = require("./routes");

const app = express();
const $PORT = process.env.PORT || 8080;

app.use(cors);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use("/api/v1", routes);
app.use("/", express.static("public"));

app.listen($PORT, () => {
  console.log(`[ SECCESS ] Server is Listening on Port ${$PORT}...`);
});
